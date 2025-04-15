import { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'hover' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
}) => {
  const baseStyles = 'bg-white rounded-lg overflow-hidden';
  
  const variants = {
    default: 'border border-gray-200',
    hover: 'border border-gray-200 transition-shadow duration-300 hover:shadow-lg',
    interactive: 'border border-gray-200 transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:-translate-y-1',
  };
  
  const paddings = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  };
  
  return (
    <div className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card; 