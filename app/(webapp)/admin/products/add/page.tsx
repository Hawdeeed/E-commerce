'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllCategories } from '../../../../../lib/api';
import { supabase } from '../../../../../lib/supabase';
import Input from '../../../../components/Input';
import TextArea from '../../../../components/TextArea';
import Select from '../../../../components/Select';
import Button from '../../../../components/Button';
import FileUpload from '../../../../components/FileUpload';
import { ROUTES } from '@/app/share/routes';

interface FormData {
  name: string;
  description: string;
  price: string;
  sale_price: string;
  category_id: string;
  in_stock: boolean;
  featured: boolean;
}

interface Variant {
  id?: string;
  product_id?: string;
  name: string;
  size: string;
  color: string[];
  price: string;
  sku: string;
  sale_price?: string;
  in_stock?: boolean;
}

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    sale_price: '',
    category_id: '',
    in_stock: true,
    featured: false,
  });
  
  const [variants, setVariants] = useState<Variant[]>([
    { name: '', size: '', color: [], price: '', sku: '' }
  ]);
  
  const [files, setFiles] = useState<File[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleVariantChange = (index: number, field: keyof Variant, value: string | string[] | boolean) => {
    const newVariants = [...variants];
    newVariants[index][field] = value as never;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { name: '', size: '', color: [], price: '', sku: '' }]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      const newVariants = [...variants];
      newVariants.splice(index, 1);
      setVariants(newVariants);
    }
  };

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (isNaN(Number(formData.price))) newErrors.price = 'Price must be a number';
    if (formData.sale_price && isNaN(Number(formData.sale_price))) {
      newErrors.sale_price = 'Sale price must be a number';
    }
    if (!formData.category_id) newErrors.category_id = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    try {
      // 1. Insert product
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert({
          name: formData.name,
          description: formData.description,
          category_id: formData.category_id,
          price: formData.price ? Number(formData.price) : null,
          sale_price: formData.sale_price ? Number(formData.sale_price) : null,
          in_stock: formData.in_stock,
        })
        .select('id')
        .single();

      if (productError) throw productError;
      
      // 2. Insert variants
      const variantsToInsert = variants
        .filter(v => v.name.trim() || v.size.trim() || v.color.length > 0)
        .map(v => ({
          product_id: product.id,
          name: v.name,
          size: v.size,
          color: v.color,
          price: v.price ? Number(v.price) : null,
          sku: v.sku || null,
          in_stock: true
        }));

      if (variantsToInsert.length > 0) {
        const { error: variantsError } = await supabase
          .from('product_variants')
          .insert(variantsToInsert);
        
        if (variantsError) throw variantsError;
      }
      
      // 3. Upload images and insert image records
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${product.id}_${i}.${fileExt}`;
          const filePath = `products/${fileName}`;
          
          // Upload file to storage
          const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, file);
          
          if (uploadError) throw uploadError;
          
          // Get public URL
          const { data: urlData } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);
          
          // Insert image record
          const { error: imageError } = await supabase
            .from('product_images')
            .insert({
              product_id: product.id,
              url: urlData.publicUrl,
              alt_text: formData.name,
              is_primary: i === 0, // First image is primary
            });
          
          if (imageError) throw imageError;
        }
      }
      
      setSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        router.push(ROUTES.adminProduct);
      }, 2000);
      
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <Button
          variant="outline"
          onClick={() => router.push(ROUTES.adminProduct)}
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
                Product added successfully! Redirecting...
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
          <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                fullWidth
                required
              />
              
              <Select
                label="Category"
                name="category_id"
                value={formData.category_id}
                onChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
                options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
                error={errors.category_id}
                fullWidth
                required
              />
            </div>
            
            <TextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Price (PKR)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                fullWidth
                required
              />
              
              <Input
                label="Sale Price (PKR)"
                name="sale_price"
                type="number"
                value={formData.sale_price}
                onChange={handleChange}
                error={errors.sale_price}
                helperText="Leave empty if no sale"
                fullWidth
              />
            </div>
            
            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="in_stock"
                  checked={formData.in_stock}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">In Stock</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Featured Product</span>
              </label>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-medium text-gray-900">Product Variants</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={addVariant}
                type="button"
              >
                Add Variant
              </Button>
            </div>
            
            {variants.map((variant, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md relative hover:border-indigo-300 transition-colors duration-200">
                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    value={variant.name}
                    onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                    fullWidth
                  />
                  
                  <Input
                    label="Size"
                    value={variant.size}
                    onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                    fullWidth
                  />
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Colors</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Gray', 'Pink', 'Purple', 'Orange'].map((color) => (
                        <div key={color} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`color-${index}-${color}`}
                            checked={variant.color?.includes(color) || false}
                            onChange={(e) => {
                              const newColors = e.target.checked
                                ? [...(variant.color || []), color]
                                : variant.color?.filter(c => c !== color) || [];
                              handleVariantChange(index, 'color', newColors);
                            }}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`color-${index}-${color}`} className="ml-2 block text-sm text-gray-900">
                            {color}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Input
                    label="Price (leave empty to use main price)"
                    type="number"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                    fullWidth
                  />
                  
                  <Input
                    label="SKU"
                    value={variant.sku}
                    onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                    fullWidth
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Product Images</h2>
            
            <FileUpload
              label="Upload Images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              helperText="First image will be used as the main product image"
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push(ROUTES.adminProduct)}
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
              {submitting ? 'Adding Product...' : 'Add Product'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
