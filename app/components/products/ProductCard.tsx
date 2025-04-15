import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Card from '../ui/Card';

export interface Product {
  id?: string | number;
  name: string;
  price: number;
  discount?: number;
  img: string;
  slug?: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: FC<ProductCardProps> = ({ product, className = '' }) => {
  const slug = product.slug || product.name.toLowerCase().replace(/\s+/g, '-');
  const discountedPrice = product.discount && product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  
  return (
    <div className={`group animate-scale-in bg-white transition-all duration-300 hover:shadow-lg ${className}`}>
      <Link href={`/products/${slug}`} className="block h-full">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <Image
            src={product.img}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {product.discount && product.discount > 0 && (
            <div className="absolute left-0 top-2 bg-red-500 px-2 py-1 text-xs font-semibold text-white">
              SAVE {product.discount}% OFF
            </div>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="font-medium text-gray-700 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-300">
            {product.name}
          </h3>
          
          <div className="mt-1 flex items-center">
            {product.discount && product.discount > 0 ? (
              <>
                <span className="font-semibold text-sm text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-xs text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-semibold text-sm text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="mt-3 flex justify-between items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-3 w-3 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-gray-500">(42)</span>
            </div>
            
            <button 
              className="rounded-full bg-gray-100 p-1.5 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-300"
              aria-label="Add to cart"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 