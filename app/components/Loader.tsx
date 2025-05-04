import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium', 
  fullScreen = false,
  text = 'Loading...'
}) => {
  // Size classes
  const sizeClasses = {
    small: 'h-8 w-8 border-2',
    medium: 'h-16 w-16 border-3',
    large: 'h-32 w-32 border-4'
  };

  // Container classes
  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50' 
    : 'flex flex-col items-center justify-center py-8';

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Main spinner */}
        <div 
          className={`${sizeClasses[size]} rounded-full border-gray-300 border-t-gray-900 animate-spin`}
        ></div>
        
        {/* Overlay spinner (for cool effect) */}
        <div 
          className={`absolute top-0 left-0 ${sizeClasses[size]} rounded-full border-transparent border-r-indigo-500 animate-spin-slow opacity-70`}
        ></div>
      </div>
      
      {text && (
        <p className="mt-4 text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );
};

export default Loader;
