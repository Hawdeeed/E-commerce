import { Fragment } from "react";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import ProductSection from './components/sections/ProductSection';
import TagSection from './components/sections/TagSection';
import CategoryGrid from './components/products/CategoryGrid';
import Button from './components/ui/Button';

import {
  categories,
  filterOptions,
  luxuryProducts,
  festiveProducts,
  dailyProducts,
  westernProducts,
  mensProducts,
  kidswearProducts,
  accessoriesProducts,
  topPicksTags
} from './data/products';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:gap-6">
          {/* Sidebar */}
          <Sidebar filterOptions={filterOptions} />

          {/* Main content */}
          <div className="w-full md:w-4/5 animate-fade-in">
            {/* Categories */}
            <div className="mb-8 bg-white p-4 rounded-md border border-gray-100 shadow-sm">
              <CategoryGrid 
                categories={categories} 
                columns={7}
              />
            </div>

            {/* Shop Luxury Picks */}
            <ProductSection
              title="Shop Luxury Picks"
              products={luxuryProducts}
              viewAllLink="/collections/luxury"
            />

            {/* Buy Festive Glam */}
            <ProductSection
              title="Buy Festive Glam"
              products={festiveProducts}
              viewAllLink="/collections/festive"
            />

            {/* Shop Daily Fits */}
            <ProductSection
              title="Shop Daily Fits"
              products={dailyProducts}
              viewAllLink="/collections/daily"
            />

            {/* Top Picks from Retail */}
            <TagSection
              title="Top Picks from Retail"
              tags={topPicksTags}
              columns={5}
            />

            {/* Shop Western */}
            <ProductSection
              title="Shop Western"
              products={westernProducts}
              viewAllLink="/collections/western"
            />

            {/* Buy Menswear */}
            <ProductSection
              title="Buy Menswear"
              products={mensProducts}
              viewAllLink="/collections/menswear"
            />

            {/* Shop Kidswear */}
            <ProductSection
              title="Shop Kidswear"
              products={kidswearProducts}
              viewAllLink="/collections/kidswear"
            />

            {/* Shop Accessories */}
            <ProductSection
              title="Shop Accessories"
              products={accessoriesProducts}
              viewAllLink="/collections/accessories"
            />
            
            {/* Newsletter Subscription */}
            <div className="mb-12 mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 md:w-3/5">
                  <h3 className="text-xl font-bold mb-2">Subscribe to our Newsletter</h3>
                  <p className="text-sm text-indigo-100">Stay updated with the latest fashion trends and exclusive offers.</p>
                </div>
                <div className="flex w-full md:w-2/5">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-gray-900"
                  />
                  <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-r-md transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
