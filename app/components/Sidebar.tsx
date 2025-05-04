import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllCategories } from '@/lib/api';
import { Category } from '../share/types';
import Loader from './Loader';

interface SidebarProps {
  filterOptions: any[];
}

const Sidebar: FC<SidebarProps> = ({ filterOptions }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        setError('Failed to load categories');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <aside className="hidden md:block w-1/5">
      <div className="sticky top-[120px]">
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
            {loading ? (
              <Loader size="small" fullScreen text="" />
            ) : error ? (
              <li>{error}</li>
            ) : (
              categories.slice(0, 5).map((category) => (
                <li key={category.id} className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
                  <Link href={`/category/${category.id}`} className="block">
                    {category.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;