"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../components/layout/Header';

// Sample brands data
const BRANDS = [
  { id: '1', name: 'Urban Style' },
  { id: '2', name: 'Elegance' },
  { id: '3', name: 'Sporty Vibes' },
  { id: '4', name: 'Casual Comfort' },
];

// Sample products data
const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'Classic Denim Jacket',
    brandId: '1',
    price: 89.99,
    colors: ['Blue', 'Black'],
    description: 'Timeless denim jacket for all seasons.',
    quantity: 25,
    images: ['https://via.placeholder.com/150?text=Denim+1', 'https://via.placeholder.com/150?text=Denim+2'],
    isNewArrival: true,
    discount: 0,
    isSoldOut: false
  },
  {
    id: '2',
    name: 'Floral Summer Dress',
    brandId: '2',
    price: 65.50,
    colors: ['White', 'Yellow', 'Pink'],
    description: 'Light and comfortable dress perfect for summer days.',
    quantity: 18,
    images: ['https://via.placeholder.com/150?text=Dress+1'],
    isNewArrival: true,
    discount: 10,
    isSoldOut: false
  },
  {
    id: '3',
    name: 'Athletic Performance Tee',
    brandId: '3',
    price: 34.99,
    colors: ['Gray', 'Black', 'Blue', 'Red'],
    description: 'Moisture-wicking fabric keeps you cool during workouts.',
    quantity: 42,
    images: ['https://via.placeholder.com/150?text=Tee+1', 'https://via.placeholder.com/150?text=Tee+2'],
    isNewArrival: false,
    discount: 0,
    isSoldOut: false
  },
  {
    id: '4',
    name: 'Relaxed Fit Hoodie',
    brandId: '4',
    price: 49.99,
    colors: ['Gray', 'Black', 'Navy'],
    description: 'Comfortable hoodie with soft inner lining.',
    quantity: 0,
    images: ['https://via.placeholder.com/150?text=Hoodie+1'],
    isNewArrival: false,
    discount: 15,
    isSoldOut: true
  },
];

const ProductsManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandFilter = searchParams.get('brand');
  
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(brandFilter || 'all');
  
  // Filter products based on search term and brand
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || product.brandId === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  // Get brand name by ID
  const getBrandName = (brandId) => {
    const brand = BRANDS.find(b => b.id === brandId);
    return brand ? brand.name : 'Unknown Brand';
  };

  // Handle delete product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    router.push(`/admin/products/edit/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-6 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <div className="flex space-x-4">
            <Link 
              href="/admin" 
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50"
            >
              Back to Dashboard
            </Link>
            <Link 
              href="/admin/products/add" 
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Add New Product
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search products..."
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full"
              >
                <option value="all">All Brands</option>
                {BRANDS.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              Showing <span className="mx-1 font-medium text-indigo-600">{filteredProducts.length}</span> of <span className="mx-1 font-medium text-indigo-600">{products.length}</span> products
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="object-cover h-full w-full"
                    />
                    {product.isNewArrival && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        New Arrival
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {product.discount}% OFF
                      </span>
                    )}
                    {product.isSoldOut && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-md font-medium">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                        <p className="mt-1 text-xs text-gray-500">{getBrandName(product.brandId)}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.discount > 0 ? (
                          <div className="flex flex-col items-end">
                            <span className="line-through text-xs text-gray-500">${product.price.toFixed(2)}</span>
                            <span className="text-red-600">
                              ${(product.price * (1 - product.discount/100)).toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span>${product.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-gray-500 mr-1">Qty:</span>
                        <span className={`text-xs font-medium ${product.quantity === 0 ? 'text-red-600' : product.quantity < 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {product.quantity}
                        </span>
                      </div>
                      <div className="flex">
                        {product.colors.slice(0, 3).map((color, index) => (
                          <div 
                            key={index} 
                            className="w-4 h-4 rounded-full border border-gray-300 ml-1"
                            style={{ 
                              backgroundColor: color.toLowerCase(),
                              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'
                            }}
                            title={color}
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 3}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="flex-1 inline-flex justify-center items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 inline-flex justify-center items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full p-6 text-center">
                <p className="text-gray-500">No products found. Try adjusting your search or add a new product.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsManagement; 