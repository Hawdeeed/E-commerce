import Link from 'next/link';
import CartIcon from './CartIcon';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-semibold text-gray-800">LAAM</span>
          </Link>

          <div className="hidden md:flex relative flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search fashion"
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right navigation */}
          <div className="flex items-center space-x-4">
            <CartIcon />
          </div>
        </div>
      </div>

      {/* Location bar */}
      <div className="bg-gray-50 py-2 text-center text-sm border-t border-gray-100">
        <span className="text-gray-600">Click here to select delivery location</span>
      </div>

      {/* Categories navigation */}
      <div className="container mx-auto px-4 py-2 border-t border-gray-100">
        <ul className="flex space-x-6 overflow-x-auto scrollbar-hide text-sm">
          <li className="whitespace-nowrap">
            <Link href="/all" className="text-gray-800 hover:text-gray-600">All</Link>
          </li>
          <li className="whitespace-nowrap">
            <Link href="/women" className="text-gray-800 hover:text-gray-600">Women</Link>
          </li>
          <li className="whitespace-nowrap">
            <Link href="/men" className="text-gray-800 hover:text-gray-600">Men</Link>
          </li>
          <li className="whitespace-nowrap">
            <Link href="/kids" className="text-gray-800 hover:text-gray-600">Kids</Link>
          </li>
          <li className="whitespace-nowrap">
            <Link href="/bridals" className="text-gray-800 hover:text-gray-600">Bridals</Link>
          </li>
          <li className="whitespace-nowrap">
            <Link href="/top-creations" className="text-gray-800 hover:text-gray-600">Top Creations</Link>
          </li>
          <li className="whitespace-nowrap">
            <Link href="/orders" className="text-gray-800 hover:text-gray-600">Orders</Link>
          </li>
          <li className="whitespace-nowrap">
            <Link href="/wishlist" className="text-gray-800 hover:text-gray-600">Wishlist</Link>
          </li>
          <li className="whitespace-nowrap">
            <Link href="/become-a-seller" className="text-gray-800 hover:text-gray-600">Become a Seller</Link>
          </li>
          <li className="whitespace-nowrap">
            <Link href="/blogs" className="text-gray-800 hover:text-gray-600">Blogs</Link>
          </li>
          <li className="whitespace-nowrap">
            <Link href="/help-center" className="text-gray-800 hover:text-gray-600">Help center</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
