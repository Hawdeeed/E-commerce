import { FC } from 'react';
import Link from 'next/link';
import Button from './Button';

interface FilterOption {
  name: string;
  count: number;
}

interface SidebarProps {
  filterOptions: FilterOption[];
}

const Sidebar: FC<SidebarProps> = ({ filterOptions }) => {
  return (
    <aside className="mb-6 w-full md:mb-0 md:w-1/5 animate-slide-up">
      <div className="sticky top-20">
        <div className="bg-white border border-gray-100 rounded-md p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">All Products</h2>
          
          <ul className="space-y-2">
            {filterOptions.map((option, idx) => (
              <li 
                key={idx} 
                className="flex cursor-pointer items-center justify-between text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              >
                <span>{option.name}</span>
                <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">{option.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-gray-100 rounded-md p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="price-1" className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
              <label htmlFor="price-1" className="ml-2 cursor-pointer text-sm text-gray-600">
                Under $100
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="price-2" className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
              <label htmlFor="price-2" className="ml-2 cursor-pointer text-sm text-gray-600">
                $100 - $500
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="price-3" className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
              <label htmlFor="price-3" className="ml-2 cursor-pointer text-sm text-gray-600">
                $500 - $1000
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="price-4" className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
              <label htmlFor="price-4" className="ml-2 cursor-pointer text-sm text-gray-600">
                Over $1000
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-md p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Top Categories</h2>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-300">
              <Link href="/categories/dresses" className="flex items-center">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                Dresses
              </Link>
            </li>
            <li className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-300">
              <Link href="/categories/western" className="flex items-center">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                Western
              </Link>
            </li>
            <li className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-300">
              <Link href="/categories/accessories" className="flex items-center">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <Button
            variant="primary"
            fullWidth
            className="py-2 text-sm font-medium shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            href="/auth/signin"
          >
            Sign In / Register
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 