'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllProducts, ProductComplete } from '../../../../lib/api';
import { supabase } from '../../../../lib/supabase';
import { ProductWithImages } from '../../../../lib/api';
import Loader from '../../../../app/components/Loader';
import Button from '../../../../app/components/ui/Button';
import Link from 'next/link';

type Product = ProductComplete;

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductComplete[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await getAllProducts();

      const filteredProducts = searchQuery
        ? allProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : allProducts;

      setTotalPages(Math.ceil(filteredProducts.length / 10));

      const startIndex = (currentPage - 1) * 10;
      const paginatedProducts = filteredProducts.slice(startIndex, startIndex + 10);

      setProducts(paginatedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setEditingProduct(productId);
    setEditData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || 0,
      sale_price: product.sale_price || null,
      in_stock: product.in_stock || false,
      featured: product.featured || false
    });
  };

  const handleEditChange = (field: keyof Product, value: any) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = async (productId: string) => {
    if (!editingProduct) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: editData.name,
          description: editData.description,
          price: editData.price,
          sale_price: editData.sale_price,
          in_stock: editData.in_stock,
          featured: editData.featured
        })
        .eq('id', productId);

      if (error) throw error;

      setEditingProduct(null);
      setEditData({});
      fetchProducts(); // Refresh the list
      alert('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditData({});
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        setDeleting(productId);

        const { data: images } = await supabase
          .from('product_images')
          .select('url')
          .eq('product_id', productId);

        if (images && images.length > 0) {
          const filePaths = images.map(img => {
            const url = new URL(img.url);
            return url.pathname.split('/').pop() || '';
          });

          for (const path of filePaths) {
            if (path) {
              await supabase.storage
                .from('product-images')
                .remove([`products/${path}`]);
            }
          }
        }

        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', productId);

        if (error) throw error;

        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      } finally {
        setDeleting(null);
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  if (loading && products.length === 0) {
    return <Loader size="large" fullScreen text="" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Button
          variant="primary"
          onClick={() => router.push('/admin/products/add')}
        >
          Add New Product
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search products..."
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
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>

                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={product.images?.[0]?.url || '/placeholder-product.jpg'}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">PKR {product.price.toLocaleString()}</div>
                      {product.sale_price && (
                        <div className="text-xs text-red-500">Sale: PKR {product.sale_price.toLocaleString()}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingProduct === product.id ? (
                        <div className="flex items-center space-x-2">
                          <select
                            value={editData.in_stock}
                            onChange={(e) => handleEditChange('in_stock', e.target.value === 'true')}
                            className="border rounded-md px-2 py-1"
                          >
                            <option value="true">In Stock</option>
                            <option value="false">Out of Stock</option>
                          </select>
                          <select
                            value={editData.featured}
                            onChange={(e) => handleEditChange('featured', e.target.value === 'true')}
                            className="border rounded-md px-2 py-1"
                          >
                            <option value="true">Featured</option>
                            <option value="false">Not Featured</option>
                          </select>
                        </div>
                      ) : (
                        <>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.in_stock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                            {product.in_stock ? 'In Stock' : 'Out of Stock'}
                          </span>
                          {product.featured && (
                            <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                              Featured
                            </span>
                          )}
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingProduct === product.id ? (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleSaveEdit(product.id)}
                            className="text-green-600 hover:text-green-900 transition-colors duration-150"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-150"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(product.id)}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            disabled={deleting === product.id}
                            className="text-red-600 hover:text-red-900 transition-colors duration-150 disabled:opacity-50"
                          >
                            {deleting === product.id ? 'Deleting...' : 'Delete'}
                          </button>
                          <Link
                            href={`/product/${product.id}`}
                            target="_blank"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-150"
                          >
                            View
                          </Link>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * 10, products.length)}
                  </span>{' '}
                  of <span className="font-medium">{products.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === index + 1
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
