'use client';

import { useState, useEffect, use } from 'react';
import { getProductById, ProductComplete } from '../../../../lib/api';
import Loader from '../../../../app/components/Loader';
import { useCart } from '../../../components/CartContext';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const unwrappedParams = use(params) as { id: string };
  const productId = unwrappedParams.id;
  const [product, setProduct] = useState<ProductComplete | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const productData = await getProductById(productId);
        setProduct(productData);

        if (productData?.variants && productData.variants.length > 0) {
          const sizes = productData.variants
            .map(v => v.size)
            .filter((size): size is string => size !== null);

          if (sizes.length > 0) {
            setSelectedSize(sizes[0]);
          }
          
          const colors = productData.variants
            .map(v => v.color)
            .filter((color): color is string => color !== null);

          if (colors.length > 0) {
            setSelectedColor(colors[0]);
          }
        }
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  if (loading) {
    return <Loader size="small" fullScreen text="" />;
  }

  if (error || !product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    setAddingToCart(true);
    
    const selectedVariant = product.variants?.find(
      v => v.size === selectedSize && v.color === selectedColor
    );
    
    const cartItem = {
      id: '',
      productId: product.id,
      variantId: selectedVariant?.id || null,
      name: product.name,
      price: product.sale_price || product.price,
      quantity: quantity,
      image: product.images?.[0]?.url || '/placeholder-product.jpg',
      size: selectedSize || null,
      color: selectedColor || null
    };
    
    addItem(cartItem);
    
    setTimeout(() => {
      setAddingToCart(false);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="relative h-[500px] mb-4 bg-gray-100">
            <img
              src={product.images?.[0]?.url || '/placeholder-product.jpg'}
              alt={product.name}
              className="w-full h-auto"
            />
            <button className="absolute top-4 right-4 bg-white rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {Array(5).fill(0).map((_, index) => (
              <div key={index} className="w-20 h-20 flex-shrink-0 border border-gray-200 relative">
                <img
                  src={product.images?.[0]?.url || '/placeholder-product.jpg'}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold">Status:</span>
                <span className="ml-2">{product.in_stock ? 'In Stock' : 'Out of Stock'}</span>
              </div>

            </div>
            <div className="mb-4">
              <div className="flex items-center">
                <span className="mr-2 text-xl font-bold">
                  Rs. {product.sale_price || product.price}
                </span>
                {product.sale_price && (
                  <span className="text-gray-500 line-through">
                    Rs. {product.price}
                  </span>
                )}
              </div>
              {product.sale_price && (
                <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded inline-block mt-1">
                  {Math.round((1 - product.sale_price / product.price) * 100)}% OFF
                </div>
              )}
            </div>
            <div className="mb-4">
              <img
                src={product.images?.[0]?.url || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-auto"
              />
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-bold">Sizes:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.variants
                    ?.filter(v => v.size)
                    .map(v => v.size)
                    .filter((size, index, self) => self.indexOf(size) === index)
                    .map((size) => (
                      <button
                        key={size}
                        className={`px-4 py-2 rounded-full border-2 ${
                          selectedSize === size
                            ? 'border-gray-800 bg-gray-50'
                            : 'border-gray-300'
                        }`}
                        onClick={() => {
                          setSelectedSize(size || '');
                          // Reset color selection when size changes
                          setSelectedColor('');
                        }}
                      >
                        {size}
                      </button>
                    ))}
                </div>
              </div>

              {selectedSize && (
                <div>
                  <span className="font-bold">Available Colors:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.variants
                      ?.filter(v => v.size === selectedSize)
                      .flatMap(v => v.color || [])
                      .filter((color, index, self) => self.indexOf(color) === index)
                      .map((color) => (
                        <button
                          key={color}
                          className={`w-6 h-6 rounded-full ${
                            selectedColor === color
                              ? 'ring-2 ring-offset-2 ring-gray-800'
                              : ''
                          }`}
                          style={{ backgroundColor: color || '#000' }}
                          onClick={() => setSelectedColor(color)}
                        ></button>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mb-4">
              <span className="font-bold">Description:</span>
              <p className="text-gray-700 mt-2">
                {product.description || 'No description available'}
              </p>
            </div>
            <div className="mb-4">
              <div className="flex items-center">
                <button className="bg-gray-200 px-3 py-1 rounded-l-md" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span className="bg-gray-100 px-4 py-1">{quantity}</span>
                <button className="bg-gray-200 px-3 py-1 rounded-r-md" onClick={handleIncreaseQuantity}>+</button>
              </div>
            </div>
            <div className="flex mb-6">
              <button
                className={`bg-gray-900 text-white py-2 px-4 rounded-md mr-2 hover:bg-gray-800 transition-all ${addingToCart ? 'opacity-70' : ''}`}
                disabled={!product.in_stock || addingToCart}
                onClick={handleAddToCart}
              >
                {addingToCart ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  product.in_stock ? 'Add to Cart' : 'Out of Stock'
                )}
              </button>
              <button className="bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300">Add to Wishlist</button>
            </div>
          </div>
        </div>
      </div>

      {/* More from the collection */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">More from the collection</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* TODO: Add a useEffect to fetch related products from the same category */}
        </div>
      </div>
    </div>
  );
}
