import { FC, ReactNode } from 'react';
import Link from 'next/link';
import SectionTitle from './SectionTitle';
import ProductGrid from '../products/ProductGrid';
import { Product } from '../products/ProductCard';
import Button from '../ui/Button';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  columns?: 1 | 2 | 3 | 4;
  maxItems?: number;
  className?: string;
  action?: ReactNode;
}

const ProductSection: FC<ProductSectionProps> = ({
  title,
  subtitle,
  products,
  viewAllLink,
  columns = 4,
  maxItems = 4,
  className = '',
  action,
}) => {
  const displayedProducts = products.slice(0, maxItems);
  
  const viewAllButton = viewAllLink ? (
    <Button
      variant="outline"
      size="sm"
      href={viewAllLink}
      className="text-xs font-medium hover:text-indigo-600 flex items-center"
    >
      View All
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-3 w-3 ml-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 5l7 7-7 7" 
        />
      </svg>
    </Button>
  ) : null;
  
  return (
    <section className={`mb-12 ${className}`}>
      <SectionTitle 
        title={title}
        subtitle={subtitle}
        action={action || viewAllButton}
      />
      <div className="bg-white p-1">
        <ProductGrid 
          products={displayedProducts}
          columns={columns}
          gap="md"
        />
      </div>
    </section>
  );
};

export default ProductSection; 