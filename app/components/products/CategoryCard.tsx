import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface Category {
  name: string;
  img: string;
  slug?: string;
}

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ category, className = '' }) => {
  const slug = category.slug || category.name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Link 
      href={`/categories/${slug}`}
      className={`group cursor-pointer animate-fade-in block text-center ${className}`}
    >
      <div className="mx-auto h-16 w-16 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center border border-gray-200">
        {category.img ? (
          <Image
            src={category.img}
            alt={category.name}
            width={32}
            height={32}
            className="h-8 w-8 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-200 shimmer"></div>
        )}
      </div>
      <p className="mt-1 text-center text-xs font-medium text-gray-600 group-hover:text-indigo-600 transition-colors duration-300">
        {category.name}
      </p>
    </Link>
  );
};

export default CategoryCard; 