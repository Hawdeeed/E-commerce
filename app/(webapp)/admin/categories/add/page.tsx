'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../../lib/supabase';
import Input from '../../../../../app/components/Input';
import TextArea from '../../../../../app/components/TextArea';
import Button from '../../../../../app/components/Button';
import FileUpload from '../../../../../app/components/FileUpload';

interface FormData {
  name: string;
  description: string;
}

export default function AddCategoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
    } else {
      setFile(null);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Category name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    try {
      // 1. Insert category
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .insert({
          name: formData.name,
          description: formData.description,
        })
        .select();
      
      if (categoryError) throw categoryError;
      
      const categoryId = categoryData[0].id;
      
      // 2. Upload image if provided
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${categoryId}.${fileExt}`;
        const filePath = `categories/${fileName}`;
        
        // Upload file to storage
        const { error: uploadError } = await supabase.storage
          .from('category-images')
          .upload(filePath, file);
        
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('category-images')
          .getPublicUrl(filePath);
        
        // Update category with image URL
        const { error: updateError } = await supabase
          .from('categories')
          .update({
            image_url: urlData.publicUrl,
          })
          .eq('id', categoryId);
        
        if (updateError) throw updateError;
      }
      
      setSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        router.push('/admin/categories');
      }, 2000);
      
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Category</h1>
        <Button
          variant="outline"
          onClick={() => router.push('/admin/categories')}
        >
          Cancel
        </Button>
      </div>

      {success ? (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded animate-fadeIn">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Category added successfully! Redirecting...
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
          <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Category Information</h2>
            
            <Input
              label="Category Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              fullWidth
              required
            />
            
            <TextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
            />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Category Image</h3>
              <FileUpload
                accept="image/*"
                onChange={handleFileChange}
                helperText="Upload a representative image for this category"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push('/admin/categories')}
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              isLoading={submitting}
              disabled={submitting}
            >
              {submitting ? 'Adding Category...' : 'Add Category'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
