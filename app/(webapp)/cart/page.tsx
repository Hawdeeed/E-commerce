'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../components/CartContext';
import { ROUTES } from '@/app/share/routes';
import Image from 'next/image';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCost = subtotal > 5000 ? 0 : 250;

  const totalCost = subtotal + shippingCost - discount;

  const handleApplyCoupon = () => {
    setCouponError('');

    if (!couponCode) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const validCoupons = {
      'WELCOME10': 10,
      'SUMMER20': 20,
      'SALE30': 30
    };

    const couponUpperCase = couponCode.toUpperCase();

    if (validCoupons[couponUpperCase as keyof typeof validCoupons]) {
      const discountPercent = validCoupons[couponUpperCase as keyof typeof validCoupons];
      const discountAmount = (subtotal * discountPercent) / 100;
      setDiscount(discountAmount);
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      router.push(ROUTES.checkout);
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any items to your cart yet.</p>
          <Link href={ROUTES.root} className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Cart Items ({items.length})</h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                  <div className="w-full sm:w-20 h-20 flex-shrink-0 mb-4 sm:mb-0">
                    <Image
                      src={item.image || '/placeholder-product.jpg'}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1 sm:ml-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                        <div className="mt-1 text-sm text-gray-500">
                          {item.size && <span className="mr-2">Size: {item.size}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <p className="text-base font-medium text-gray-900">PKR {item.price.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-gray-500 hover:text-red-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-20">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Order Summary</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">PKR {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shippingCost === 0 ? 'Free' : `PKR ${shippingCost.toLocaleString()}`}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">- PKR {discount.toLocaleString()}</span>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>PKR {totalCost.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Tax included and shipping calculated at checkout
                </p>
              </div>

              <div className="mt-6">
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-md hover:bg-gray-300"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-red-600 text-sm mb-4">{couponError}</p>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">We accept:</p>
                <div className="flex space-x-2">
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
