import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  luxuryProducts, 
  festiveProducts, 
  dailyProducts,
  westernProducts,
  mensProducts,
  kidswearProducts,
  accessoriesProducts
} from '@/app/data/products';

// Combine all products for lookup
const allProducts = [
  ...luxuryProducts,
  ...festiveProducts,
  ...dailyProducts,
  ...westernProducts,
  ...mensProducts,
  ...kidswearProducts,
  ...accessoriesProducts
];

export function generateStaticParams() {
  return allProducts.map(product => ({
    slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = params;
  
  // Find the product by slug
  const product = allProducts.find(
    p => (p.slug || p.name.toLowerCase().replace(/\s+/g, '-')) === slug
  );
  
  if (!product) {
    notFound();
  }
  
  // Calculate discounted price if applicable
  const discountedPrice = product.discount && product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  
  // Find related products (from same category or similar price range)
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/collections" className="hover:text-indigo-600 transition-colors">Collections</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={product.img}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
                
                {product.discount && product.discount > 0 && (
                  <div className="absolute left-4 top-4 bg-red-500 px-3 py-1.5 text-sm font-semibold text-white rounded-md animate-pulse">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-md overflow-hidden border-2 border-transparent hover:border-indigo-500 transition-all cursor-pointer">
                    <Image
                      src={product.img}
                      alt={`${product.name} view ${i}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg
                      key={star}
                      className={`h-5 w-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">(42 reviews)</span>
              </div>
              
              <div className="mb-6">
                {product.discount && product.discount > 0 ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="ml-3 text-lg text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="ml-3 text-sm text-green-600 font-medium">
                      Save ${(product.price - discountedPrice).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="border-t border-b border-gray-100 py-4 mb-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
                  tortor a facilisis malesuada, nisi magna venenatis metus, ac tincidunt urna 
                  erat et sem. Nulla facilisi. Vivamus auctor, turpis at commodo tincidunt, 
                  neque eros aliquam nulla, non imperdiet dui purus eget ante.
                </p>
              </div>
              
              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Size</h3>
                <div className="flex space-x-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button
                      key={size}
                      className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center text-sm transition-all hover:border-indigo-500 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Color</h3>
                <div className="flex space-x-2">
                  {[
                    { name: 'Black', color: 'bg-gray-900' },
                    { name: 'White', color: 'bg-white border border-gray-300' },
                    { name: 'Blue', color: 'bg-blue-500' },
                    { name: 'Red', color: 'bg-red-500' },
                  ].map(color => (
                    <button
                      key={color.name}
                      className={`w-8 h-8 rounded-full ${color.color} flex items-center justify-center transition-all hover:ring-2 hover:ring-offset-1 hover:ring-indigo-500 focus:outline-none`}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Quantity</h3>
                <div className="flex w-32 items-center border border-gray-300 rounded-md">
                  <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                    </svg>
                  </button>
                  <input
                    type="text"
                    value="1"
                    readOnly
                    className="flex-1 h-10 text-center text-gray-900 focus:outline-none"
                  />
                  <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-4 mt-auto">
                <button className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 animate-pulse">
                  Add to Cart
                </button>
                <button className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
              
              {/* Free Shipping Banner */}
              <div className="mt-6 p-3 bg-green-50 rounded-md border border-green-100 flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-sm text-green-800">Free shipping on orders over $100</span>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="border-t border-gray-100 px-6 py-6">
            <div className="flex border-b border-gray-100">
              <button className="px-4 py-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600">
                Description
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                Specifications
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                Reviews (42)
              </button>
            </div>
            
            <div className="py-4">
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
                nunc vitae lacinia lacinia, nisl urna aliquam velit, nec tincidunt enim 
                dui id mauris. Vivamus in libero sit amet velit ultricies tempor. Donec 
                sodales, ipsum non cursus tincidunt, velit dui finibus magna, nec tincidunt 
                dolor turpis a ex. Nam auctor, quam a scelerisque fermentum, mauris neque 
                bibendum mauris, id ultrices arcu nisl vel tortor.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Nulla facilisi. Phasellus ultricies, turpis at commodo aliquam, est orci 
                rutrum justo, quis facilisis elit orci at orci. Nam auctor, quam a scelerisque 
                fermentum, mauris neque bibendum mauris, id ultrices arcu nisl vel tortor.
              </p>
              
              <ul className="mt-4 pl-5 list-disc text-gray-600 space-y-2">
                <li>Premium quality materials</li>
                <li>Ethically sourced and manufactured</li>
                <li>Perfect fit with size guarantee</li>
                <li>30-day money-back guarantee</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(relProduct => (
              <Link 
                key={relProduct.id} 
                href={`/products/${relProduct.slug || relProduct.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-100 relative">
                  <Image
                    src={relProduct.img}
                    alt={relProduct.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {relProduct.discount && relProduct.discount > 0 && (
                    <div className="absolute left-2 top-2 bg-red-500 px-2 py-1 text-xs font-semibold text-white rounded">
                      {relProduct.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {relProduct.name}
                  </h3>
                  <div className="mt-1 flex items-center">
                    {relProduct.discount && relProduct.discount > 0 ? (
                      <>
                        <span className="font-semibold text-sm text-gray-900">
                          ${(relProduct.price * (1 - relProduct.discount / 100)).toFixed(2)}
                        </span>
                        <span className="ml-2 text-xs text-gray-500 line-through">
                          ${relProduct.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="font-semibold text-sm text-gray-900">
                        ${relProduct.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 