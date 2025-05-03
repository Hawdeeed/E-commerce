import { FC } from 'react';
import Link from 'next/link';
import Button from './Button';
import { categories } from '../share/data';

interface FilterOption {
  name: string;
  count: number;
}

interface SidebarProps {
  filterOptions: FilterOption[];
}

const Sidebar: FC<SidebarProps> = ({ filterOptions }) => {
  return (
    <aside className="hidden md:block w-1/5 animate-slide-up">
      <div className="sticky top-[180px]">
        <div className="bg-white border border-gray-100 rounded-md p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">All</h2>
          
          <ul className="space-y-2">
            <li className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <Link href="/women" className="block">Women</Link>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <Link href="/men" className="block">Men</Link>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <Link href="/kids" className="block">Kids</Link>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <Link href="/bridals" className="block">Bridals</Link>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-100 rounded-md p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Top Creations</h2>
          <ul className="space-y-2">
            {categories.slice(0, 5).map((category) => (
              <li key={category.id} className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <Link href={`/category/${category.id}`} className="block">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-gray-100 rounded-md p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Orders</h2>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <Link href="/orders/track" className="block">Track Order</Link>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <Link href="/orders/history" className="block">Order History</Link>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-100 rounded-md p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Wishlist</h2>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <Link href="/wishlist" className="block">View Wishlist</Link>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-100 rounded-md p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Become a Seller</h2>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <Link href="/seller/register" className="block">Register as Seller</Link>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <Link href="/seller/login" className="block">Seller Login</Link>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-100 rounded-md p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Blogs</h2>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <Link href="/blogs" className="block">Fashion Blogs</Link>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-100 rounded-md p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Help center</h2>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <Link href="/help/faq" className="block">FAQs</Link>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <Link href="/help/contact" className="block">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;