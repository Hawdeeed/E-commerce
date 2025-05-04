import Image from 'next/image';
import Link from 'next/link';
import { Category } from '../share/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link href={`/category/${category.id}`} className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-gray-200 mb-2">
        <div className="relative w-full h-full">
          <Image
            src={category.image_url || '/placeholder-category.jpg'}
            alt={category.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <span className="text-xs text-center max-w-[80px]">{category.name}</span>
    </Link>
  );
};

export default CategoryCard;
