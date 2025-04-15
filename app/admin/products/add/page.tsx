"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../../components/layout/Header';

// Sample brands data
const BRANDS = [
  { id: '1', name: 'Urban Style' },
  { id: '2', name: 'Elegance' },
  { id: '3', name: 'Sporty Vibes' },
  { id: '4', name: 'Casual Comfort' },
];

// Available colors
const AVAILABLE_COLORS = [
  'Black', 'White', 'Gray', 'Red', 'Blue', 'Green', 
  'Yellow', 'Purple', 'Pink', 'Orange', 'Brown', 'Navy'
];

const AddProductPage = () => {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    brandId: '',
    price: '',
    description: '',
    quantity: '',
    isNewArrival: true,
    discount: '0',
    isSoldOut: false,
  });
  
  const [colors, setColors] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [colorInput, setColorInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // Check if adding would exceed 5 images
    if (images.length + files.length > 5) {
      setErrors(prev => ({
        ...prev,
        images: 'You can upload a maximum of 5 images'
      }));
      return;
    }
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file type
      if (!file.type.includes('image/')) {
        setErrors(prev => ({
          ...prev,
          images: 'Please upload only image files'
        }));
        return;
      }
      
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          images: 'Each image size should be less than 2MB'
        }));
        return;
      }
      
      // Create preview and add to state
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
      
      // Add file to state
      setImageFiles(prev => [...prev, file]);
    }
    
    // Clear error
    if (errors.images) {
      setErrors(prev => ({
        ...prev,
        images: ''
      }));
    }
  };
  
  // Remove image
  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // Add color
  const handleAddColor = () => {
    if (!colorInput.trim()) return;
    
    if (colors.includes(colorInput)) {
      setErrors(prev => ({
        ...prev,
        colors: 'This color is already added'
      }));
      return;
    }
    
    setColors(prev => [...prev, colorInput]);
    setColorInput('');
    
    // Clear error
    if (errors.colors) {
      setErrors(prev => ({
        ...prev,
        colors: ''
      }));
    }
  };
  
  // Add color from predefined list
  const handleAddPredefinedColor = (color: string) => {
    if (colors.includes(color)) {
      setErrors(prev => ({
        ...prev,
        colors: 'This color is already added'
      }));
      return;
    }
    
    setColors(prev => [...prev, color]);
    
    // Clear error
    if (errors.colors) {
      setErrors(prev => ({
        ...prev,
        colors: ''
      }));
    }
  };
  
  // Remove color
  const handleRemoveColor = (color: string) => {
    setColors(prev => prev.filter(c => c !== color));
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.brandId) {
      newErrors.brandId = 'Brand is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.quantity.trim()) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(parseInt(formData.quantity)) || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity must be a non-negative number';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (colors.length === 0) {
      newErrors.colors = 'At least one color is required';
    }
    
    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would upload the images and send the data to the server
      console.log('Form submitted:', formData);
      console.log('Colors:', colors);
      console.log('Image files:', imageFiles);
      
      // Show success message and redirect
      alert('Product added successfully!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to add product. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-6 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <Link 
            href="/admin/products" 
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50"
          >
            Back to Products
          </Link>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full`}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>
              
              {/* Brand */}
              <div>
                <label htmlFor="brandId" className="block text-sm font-medium text-gray-700 mb-1">
                  Brand <span className="text-red-500">*</span>
                </label>
                <select
                  id="brandId"
                  name="brandId"
                  value={formData.brandId}
                  onChange={handleChange}
                  className={`rounded-md border ${errors.brandId ? 'border-red-500' : 'border-gray-300'} bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full`}
                >
                  <option value="">Select a brand</option>
                  {BRANDS.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
                {errors.brandId && (
                  <p className="mt-1 text-xs text-red-500">{errors.brandId}</p>
                )}
              </div>
              
              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`rounded-md border ${errors.price ? 'border-red-500' : 'border-gray-300'} bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-red-500">{errors.price}</p>
                )}
              </div>
              
              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  className={`rounded-md border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full`}
                  placeholder="Enter quantity"
                />
                {errors.quantity && (
                  <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>
                )}
              </div>
              
              {/* Discount */}
              <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full"
                  placeholder="0"
                />
              </div>
              
              {/* Flags */}
              <div className="flex space-x-6 items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isNewArrival"
                    name="isNewArrival"
                    checked={formData.isNewArrival}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="isNewArrival" className="ml-2 text-sm text-gray-700">
                    New Arrival
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isSoldOut"
                    name="isSoldOut"
                    checked={formData.isSoldOut}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="isSoldOut" className="ml-2 text-sm text-gray-700">
                    Sold Out
                  </label>
                </div>
              </div>
            </div>
            
            {/* Product Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Colors <span className="text-red-500">*</span>
              </label>
              
              <div className={`rounded-md border ${errors.colors ? 'border-red-500' : 'border-gray-300'} p-4`}>
                {/* Added colors */}
                {colors.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {colors.map((color, index) => (
                      <div 
                        key={index} 
                        className="flex items-center rounded-full px-3 py-1 bg-gray-100 text-sm"
                      >
                        <span 
                          className="w-3 h-3 rounded-full mr-1" 
                          style={{ backgroundColor: color.toLowerCase() }}
                        ></span>
                        <span>{color}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(color)}
                          className="ml-2 text-gray-500 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Predefined colors */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Common colors:</p>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_COLORS.map((color, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleAddPredefinedColor(color)}
                        className={`rounded-full w-6 h-6 border border-gray-300 ${colors.includes(color) ? 'opacity-50' : ''}`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                        disabled={colors.includes(color)}
                      ></button>
                    ))}
                  </div>
                </div>
                
                {/* Custom color input */}
                <div className="flex">
                  <input
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    placeholder="Add custom color"
                    className="rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 flex-grow"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="rounded-r-md border border-l-0 border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              {errors.colors && (
                <p className="mt-1 text-xs text-red-500">{errors.colors}</p>
              )}
            </div>
            
            {/* Product Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Images <span className="text-red-500">*</span> <span className="text-gray-400 text-xs">(Max 5)</span>
              </label>
              
              <div className={`border-2 border-dashed ${errors.images ? 'border-red-500' : 'border-gray-300'} rounded-md p-4`}>
                {/* Image previews */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-100">
                          <img 
                            src={image} 
                            alt={`Preview ${index + 1}`} 
                            className="object-cover h-32 w-full"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    
                    {/* Upload more button if less than 5 images */}
                    {images.length < 5 && (
                      <div className="flex flex-col items-center justify-center h-32 rounded-md border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="add-more-images"
                          multiple
                        />
                        <label htmlFor="add-more-images" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span className="text-xs text-gray-500">Add More</span>
                        </label>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Upload area if no images */}
                {images.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-500 mb-2">Drag and drop product images, or click to select</p>
                    <p className="text-xs text-gray-400 mb-2">PNG, JPG, GIF up to 2MB</p>
                    <p className="text-xs text-gray-400">You can upload up to 5 images</p>
                    
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      multiple
                    />
                  </div>
                )}
              </div>
              
              {errors.images && (
                <p className="mt-1 text-xs text-red-500">{errors.images}</p>
              )}
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300'} bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full`}
                placeholder="Enter product description"
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">{errors.description}</p>
              )}
            </div>
            
            {/* Submit Error Message */}
            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{errors.submit}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <Link
                href="/admin/products"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProductPage; 