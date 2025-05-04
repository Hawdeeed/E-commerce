'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllCategories } from '../../../../lib/api';
import { supabase } from '../../../../lib/supabase';
import Loader from '../../../../app/components/Loader';
import Button from '../../../components/Button';
import Link from 'next/link';
import { ROUTES } from '@/app/share/routes';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [searchQuery]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const allCategories = await getAllCategories();
      
      // Filter categories by search query
      const filteredCategories = searchQuery 
        ? allCategories.filter((category: any) => 
            category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.description?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : allCategories;
      
      setCategories(filteredCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? Products in this category will become uncategorized.')) {
      try {
        setDeleting(categoryId);
        
        // Check if category has products
        const { count, error: countError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', categoryId);
        
        if (countError) throw countError;
        
        if (count && count > 0) {
          // Update products to remove category
          const { error: updateError } = await supabase
            .from('products')
            .update({ category_id: null })
            .eq('category_id', categoryId);
          
          if (updateError) throw updateError;
        }
        
        // Delete category image from storage if exists
        const { data: category } = await supabase
          .from('categories')
          .select('image_url')
          .eq('id', categoryId)
          .single();
        
        if (category?.image_url) {
          const url = new URL(category.image_url);
          const path = url.pathname.split('/').pop();
          
          if (path) {
            await supabase.storage
              .from('category-images')
              .remove([`categories/${path}`]);
          }
        }
        
        // Delete category
        const { error } = await supabase
          .from('categories')
          .delete()
          .eq('id', categoryId);
        
        if (error) throw error;
        
        // Refresh category list
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category. Please try again.');
      } finally {
        setDeleting(null);
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (loading && categories.length === 0) {
    return <Loader size="small" fullScreen text="" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <Button
          variant="primary"
          onClick={() => router.push(ROUTES.adminAddCategory)}
        >
          Add New Category
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search categories..."
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="secondary" type="submit">
              Search
            </Button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th> */}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={category.image_url || '/placeholder-category.jpg'}
                            alt={category.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          <div className="text-sm text-gray-500">ID: {category.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-md truncate">
                        {category.description || 'No description'}
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.product_count || 0} products
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/admin/categories/edit/${category.id}`}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          disabled={deleting === category.id}
                          className="text-red-600 hover:text-red-900 transition-colors duration-150 disabled:opacity-50"
                        >
                          {deleting === category.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
