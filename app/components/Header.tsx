"use client";

import Link from 'next/link';
import { FC, useState, useEffect } from 'react';
import Input from './Input';
import Hamburger from './Hamburger';

interface HeaderProps {
  cartItemsCount?: number;
}

const Header: FC<HeaderProps> = ({ cartItemsCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle closing the menu when clicking anywhere
  useEffect(() => {
    if (isMenuOpen) {
      const handleClick = () => setIsMenuOpen(false);
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const headerClasses = `sticky top-0 z-50 bg-white shadow-sm animate-fade-in transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'
    }`;

  const menuLinks = [
    { name: 'Men', href: '/categories/men' },
    { name: 'Women', href: '/categories/women' },
    { name: 'Kids', href: '/categories/kids' },
    { name: 'Festive', href: '/categories/festive' },
    { name: 'Luxury', href: '/categories/luxury' },
    { name: 'Accessories', href: '/categories/accessories' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <header className={headerClasses}>
      <div className="mx-auto max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <div className="flex items-center">
            <button className="text-xs text-gray-500 hover:text-indigo-600 transition-colors duration-300">
              <span className="hidden sm:inline">Help</span> / Info
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600 transition-colors duration-300">
              <span>Cart</span>
              {cartItemsCount > 0 && (
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-600">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Main header with logo, navigation, and search */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">
                <span className="text-indigo-600">E</span>LAM
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <Input
                type="text"
                placeholder="Search for items..."
                className="w-full"
              />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Hamburger
                isOpen={isMenuOpen}
                toggle={toggleMenu}
                variant="elastic"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } md:hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <h1 className="text-xl font-bold text-gray-800">
                  <span className="text-indigo-600">E</span>LAM
                </h1>
              </Link>
              <Hamburger
                isOpen={isMenuOpen}
                toggle={toggleMenu}
                variant="spin"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              />
            </div>

            <div className="p-4">
              <Input
                type="text"
                placeholder="Search for items..."
                className="w-full mb-6"
              />

              <nav className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
                  <ul className="space-y-4">
                    {menuLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-base font-medium text-gray-900 hover:text-indigo-600 transition-colors flex items-center"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3"></span>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">User</h3>
                  <ul className="space-y-4">
                    <li>
                      <Link
                        href="/account"
                        className="text-base font-medium text-gray-900 hover:text-indigo-600 transition-colors flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/cart"
                        className="text-base font-medium text-gray-900 hover:text-indigo-600 transition-colors flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        Cart
                        {cartItemsCount > 0 && (
                          <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-600">
                            {cartItemsCount}
                          </span>
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/wishlist"
                        className="text-base font-medium text-gray-900 hover:text-indigo-600 transition-colors flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        Wishlist
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <Link
                    href="/auth/signin"
                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In / Register
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 