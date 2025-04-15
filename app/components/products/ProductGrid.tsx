import { FC } from 'react';
import ProductCard, { Product } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
}

const ProductGrid: FC<ProductGridProps> = ({
  products,
  columns = 4,
  className = '',
  gap = 'md',
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
  };

  const gridGaps = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div className={`grid ${gridCols[columns]} ${gridGaps[gap]} ${className}`}>
      {products.map((product, idx) => (
        <div key={product.id || idx} className="group shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid; 