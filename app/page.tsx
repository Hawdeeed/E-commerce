"use client";
import { useState, useEffect } from 'react';
import { getAllCategories, getAllProducts, getFeaturedProducts } from '../lib/api';
import Banner from './components/Banner';
import CategoryCard from './components/CategoryCard';
import ProductCard from './components/ProductCard';
import PromoOffer from './components/PromoOffer';
import Loader from './components/Loader';
import { Category } from '@/app/share/types';
import { Product } from '@/app/share/types';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesData = await getAllCategories();
        const productsData = await getAllProducts();
        const featuredProductsData = await getFeaturedProducts();

        setCategories(categoriesData);
        setProducts(productsData);
        setFeaturedProducts(featuredProductsData);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loader size="large" fullScreen text="" />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Error loading data</h2>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto">
      <div>
        <Banner banner={{
          id: 'main-banner',
          title: "Welcome to Our Store",
          image: "/images/banner.jpg",
          subtitle: "Discover Our Latest Collection",
          description: "Shop the latest trends in women's fashion",
          buttonText: "Shop Now",
          buttonLink: "/shop"
        }} />

        <div className="my-8">
          <div className="flex justify-evenly space-x-4 overflow-x-auto py-4 scrollbar-hide">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        <div className="my-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Lawn 2025</h2>
            <p className="text-sm text-gray-500">DIRECTLY FROM THE EXPERTS fashion gurus</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="my-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Shop Luxury Picks</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {featuredProducts.slice(4, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <PromoOffer
          title="Special Offer"
          description="Get 20% off on your first purchase"
          image="/images/promo.jpg"
          buttonText="Shop Now"
          buttonLink="/shop"
        />
      </div>
    </div>
  );
}
