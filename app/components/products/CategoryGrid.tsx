import { FC } from 'react';
import CategoryCard, { Category } from './CategoryCard';

interface CategoryGridProps {
  categories: Category[];
  columns?: 4 | 5 | 6 | 7;
  className?: string;
}

const CategoryGrid: FC<CategoryGridProps> = ({
  categories,
  columns = 7,
  className = '',
}) => {
  const gridCols = {
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-3 sm:grid-cols-6',
    7: 'grid-cols-4 md:grid-cols-7',
  };

  return (
    <div className={`grid gap-4 ${gridCols[columns]} ${className}`}>
      {categories.map((category, idx) => (
        <CategoryCard key={idx} category={category} />
      ))}
    </div>
  );
};

export default CategoryGrid; 