import { FC } from 'react';
import Link from 'next/link';
import SectionTitle from './SectionTitle';

interface Tag {
  name: string;
  slug?: string;
}

interface TagSectionProps {
  title: string;
  subtitle?: string;
  tags: Tag[];
  columns?: 3 | 4 | 5 | 6; 
  className?: string;
}

const TagSection: FC<TagSectionProps> = ({
  title,
  subtitle,
  tags,
  columns = 5,
  className = '',
}) => {
  const gridCols = {
    3: 'grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-5',
    6: 'grid-cols-3 sm:grid-cols-6',
  };

  return (
    <section className={`mb-12 ${className}`}>
      <SectionTitle 
        title={title}
        subtitle={subtitle}
      />
      <div className={`grid ${gridCols[columns]} gap-3`}>
        {tags.map((tag, idx) => {
          const slug = tag.slug || tag.name.toLowerCase().replace(/\s+/g, '-');
          
          return (
            <Link
              key={idx}
              href={`/tags/${slug}`}
              className="cursor-pointer rounded-md bg-gray-50 border border-gray-100 p-4 text-center text-sm font-medium hover:bg-gray-100 hover:text-indigo-600 transition-all duration-300 hover-lift animate-fade-in shadow-sm"
            >
              {tag.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default TagSection; 