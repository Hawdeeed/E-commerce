import Image from 'next/image';
import Link from 'next/link';
import { ProductWithImages } from '../../lib/api';

interface ProductCardProps {
  product: ProductWithImages;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="block group bg-white p-4 rounded-md">
      <div className="relative">
        <div className="relative w-full h-60 overflow-hidden">
          <Image
            src={product.images[0]?.url || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {product.sale_price && (
          <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded inline-block mt-1">
            {Math.round((1 - product.sale_price / product.price) * 100)}% OFF
          </div>
        )}
        <button className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm">PKR {product.price.toLocaleString()}</p>
          {product.sale_price && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              PKR {product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
