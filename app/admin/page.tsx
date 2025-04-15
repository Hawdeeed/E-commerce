"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../components/layout/Header';

// Admin Dashboard Overview Statistics
const AdminDashboard = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulating authentication check
  useEffect(() => {
    // Check authentication status (in a real app, this would verify a token)
    const checkAuth = () => {
      // For demo purposes, we'll just set isLoggedIn to true
      setIsLoggedIn(true);
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-indigo-600">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Admin Access Required</h1>
        <p className="mb-6 text-gray-600">Please sign in to access the admin panel.</p>
        <Link href="/auth/signin" className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
          Sign In
        </Link>
      </div>
    );
  }

  // Stats for the dashboard
  const stats = [
    { name: 'Total Brands', value: '24' },
    { name: 'Total Products', value: '458' },
    { name: 'Low Stock Items', value: '12' },
    { name: 'Out of Stock', value: '5' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-6 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <Link 
              href="/admin/brands" 
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50"
            >
              Manage Brands
            </Link>
            <Link 
              href="/admin/products" 
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Manage Products
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="overflow-hidden rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
              </div>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">About ELAM</h2>
          <p className="text-gray-600 mb-4">
            ELAM is a modern e-commerce platform offering a wide range of clothing items from various brands.
            Our platform is designed to provide customers with a seamless shopping experience while giving
            brands the exposure they need to reach more customers.
          </p>
          <p className="text-gray-600">
            As an admin, you can manage brands, products, inventory, and monitor sales through this dashboard.
            Use the navigation links above to access different sections of the admin panel.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/admin/brands/add" 
                className="flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add New Brand
              </Link>
              <Link 
                href="/admin/products/add" 
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Add New Product
              </Link>
              <Link 
                href="/admin/inventory" 
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Update Inventory
              </Link>
              <Link 
                href="/admin/orders" 
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Manage Orders
              </Link>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <span className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span className="text-gray-600">Added new brand: <span className="font-medium text-gray-900">Urban Style</span></span>
                <span className="ml-auto text-xs text-gray-400">2 hours ago</span>
              </li>
              <li className="flex items-center text-sm">
                <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <span className="text-gray-600">Updated inventory for <span className="font-medium text-gray-900">Summer Collection</span></span>
                <span className="ml-auto text-xs text-gray-400">Yesterday</span>
              </li>
              <li className="flex items-center text-sm">
                <span className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                <span className="text-gray-600">Low stock alert for <span className="font-medium text-gray-900">Denim Jackets</span></span>
                <span className="ml-auto text-xs text-gray-400">2 days ago</span>
              </li>
              <li className="flex items-center text-sm">
                <span className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                <span className="text-gray-600">Added 15 new products to <span className="font-medium text-gray-900">Festive Collection</span></span>
                <span className="ml-auto text-xs text-gray-400">1 week ago</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 