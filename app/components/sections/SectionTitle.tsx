import { FC, ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

const SectionTitle: FC<SectionTitleProps> = ({
  title,
  subtitle,
  action,
  className = '',
}) => {
  return (
    <div className={`mb-5 mt-12 animate-slide-up ${className}`}>
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <div className="flex items-center">
          <div className="h-4 w-1.5 bg-indigo-600 rounded-sm mr-3"></div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          {subtitle && (
            <p className="ml-3 text-sm text-gray-500 italic">{subtitle}</p>
          )}
        </div>
        {action && (
          <div>{action}</div>
        )}
      </div>
    </div>
  );
};

export default SectionTitle; 