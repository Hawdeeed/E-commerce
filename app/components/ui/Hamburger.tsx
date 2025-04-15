import { FC, useState } from 'react';

interface HamburgerProps {
  isOpen: boolean;
  toggle: () => void;
  className?: string;
  variant?: 'default' | 'spin' | 'elastic' | 'arrow';
}

const Hamburger: FC<HamburgerProps> = ({
  isOpen,
  toggle,
  className = '',
  variant = 'spin',
}) => {
  const baseClasses = "relative w-10 h-10 flex justify-center items-center transition-all duration-300 focus:outline-none";
  
  const variants = {
    default: {
      button: "",
      bar1: `${isOpen ? 'rotate-45 translate-y-1.5' : ''}`,
      bar2: `${isOpen ? 'opacity-0' : 'opacity-100'}`,
      bar3: `${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`,
    },
    spin: {
      button: `${isOpen ? 'rotate-90' : ''}`,
      bar1: `${isOpen ? 'rotate-45 translate-y-1.5' : ''}`,
      bar2: `${isOpen ? 'opacity-0' : 'opacity-100'}`,
      bar3: `${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`,
    },
    elastic: {
      button: "",
      bar1: `${isOpen ? 'rotate-45 translate-y-1.5 w-6' : 'w-6'}`,
      bar2: `${isOpen ? 'opacity-0' : 'opacity-100 w-5'}`,
      bar3: `${isOpen ? '-rotate-45 -translate-y-1.5 w-6' : 'w-4'}`,
    },
    arrow: {
      button: "",
      bar1: `${isOpen ? 'rotate-45 translate-y-1.5 translate-x-0.5' : ''}`,
      bar2: `${isOpen ? 'opacity-0' : 'opacity-100'}`,
      bar3: `${isOpen ? '-rotate-45 -translate-y-1.5 translate-x-0.5' : ''}`,
    },
  };

  const currentVariant = variants[variant];
  
  return (
    <button 
      className={`${baseClasses} ${currentVariant.button} ${className}`}
      onClick={toggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
      <div className="flex flex-col justify-between h-3.5 w-6">
        <span 
          className={`h-0.5 bg-current transform transition-all duration-300 ${currentVariant.bar1}`}
        />
        <span 
          className={`h-0.5 bg-current transform transition-all duration-300 ${currentVariant.bar2}`}
        />
        <span 
          className={`h-0.5 bg-current transform transition-all duration-300 ${currentVariant.bar3}`}
        />
      </div>
    </button>
  );
};

export default Hamburger; 