"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/layout/Header';
import Image from 'next/image';

// Sample brands data (in a real app, this would come from an API)
const INITIAL_BRANDS = [
  {
    id: '1',
    name: 'Urban Style',
    quantity: 45,
    image: 'https://via.placeholder.com/150?text=Urban+Style',
    description: 'Modern urban fashion for the stylish and trendy individuals.',
  },
  {
    id: '2',
    name: 'Elegance',
    quantity: 32,
    image: 'https://via.placeholder.com/150?text=Elegance',
    description: 'Sophisticated fashion with an emphasis on classic designs and quality materials.',
  },
  {
    id: '3',
    name: 'Sporty Vibes',
    quantity: 27,
    image: 'https://via.placeholder.com/150?text=Sporty+Vibes',
    description: 'Athletic wear designed for comfort and performance.',
  },
  {
    id: '4',
    name: 'Casual Comfort',
    quantity: 38,
    image: 'https://via.placeholder.com/150?text=Casual+Comfort',
    description: 'Everyday wear that combines style with relaxed comfort.',
  },
];

const BrandsManagement = () => {
  const router = useRouter();
  const [brands, setBrands] = useState(INITIAL_BRANDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  
  // Filter brands based on search term
  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete brand
  const handleDeleteBrand = (id) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      setBrands(brands.filter(brand => brand.id !== id));
    }
  };

  // Handle edit brand
  const handleEditBrand = (brand) => {
    router.push(`/admin/brands/edit/${brand.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-6 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Brands Management</h1>
          <div className="flex space-x-4">
            <Link 
              href="/admin" 
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50"
            >
              Back to Dashboard
            </Link>
            <Link 
              href="/admin/brands/add" 
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Add New Brand
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search brands..."
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
            <div className="flex items-center text-sm text-gray-500">
              Total Brands: <span className="ml-1 font-medium text-indigo-600">{brands.length}</span>
            </div>
          </div>
        </div>

        {/* Brands List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-gray-200">
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <div key={brand.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-16 w-16 relative rounded-lg overflow-hidden bg-gray-100">
                        <img 
                          src={brand.image} 
                          alt={brand.name}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{brand.name}</h3>
                        <p className="mt-1 text-sm text-gray-500 max-w-md line-clamp-1">{brand.description}</p>
                        <div className="mt-2 flex items-center">
                          <span className="text-xs font-medium text-gray-500">Products in inventory:</span>
                          <span className="ml-1 text-xs font-medium text-indigo-600">{brand.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 md:mt-0">
                      <button
                        onClick={() => handleEditBrand(brand)}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBrand(brand.id)}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Delete
                      </button>
                      <Link
                        href={`/admin/products?brand=${brand.id}`}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        View Products
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No brands found. Try adjusting your search or add a new brand.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrandsManagement; 