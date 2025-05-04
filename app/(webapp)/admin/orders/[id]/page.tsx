'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../../lib/supabase';
import Loader from '../../../../../app/components/Loader';
import Button from '../../../../components/Button';
import { ROUTES } from '@/app/share/routes';
import Image from 'next/image';
import { Order, OrderItem } from '@/app/share/types';

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const orderId = params.id;

  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(
            *,
            product:products(*),
            variant:product_variants(*)
          )
        `)
        .eq('id', orderId)
        .single();

      if (error) throw error;

      // Ensure all items have the required properties
      if (data && data.items) {
        data.items = data.items.map((item: OrderItem) => ({
          ...item,
          // Use unit_price from order_items as price
          price: item.unit_price || 0,
          // Ensure product has images array
          product: {
            ...item.product,
            name: item.product?.name || 'Unknown Product',
            images: item.product?.images || []
          },
          // Ensure variant properties are defined
          variant: item.variant ? {
            ...item.variant,
            name: item.variant.name || '',
            size: item.variant.size || '',
            color: item.variant.color || ''
          } : null
        }));
      }

      setOrder(data);
      setTrackingNumber(data.tracking_number || '');
      setNotes(data.notes || '');
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!order) return;

    try {
      setUpdatingStatus(true);

      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrder({ ...order, status: newStatus });
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleUpdateTracking = async () => {
    if (!order) return;

    try {
      setUpdatingStatus(true);

      const { error } = await supabase
        .from('orders')
        .update({ tracking_number: trackingNumber })
        .eq('id', orderId);

      if (error) throw error;

      alert('Tracking number updated successfully');
    } catch (error) {
      console.error('Error updating tracking number:', error);
      alert('Failed to update tracking number. Please try again.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleUpdateNotes = async () => {
    if (!order) return;

    try {
      setUpdatingStatus(true);

      const { error } = await supabase
        .from('orders')
        .update({ notes: notes })
        .eq('id', orderId);

      if (error) throw error;

      alert('Order notes updated successfully');
    } catch (error) {
      console.error('Error updating order notes:', error);
      alert('Failed to update order notes. Please try again.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return <Loader size="medium" fullScreen text="Loading order details..." />;
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
        <p className="text-gray-600 mb-6">The order you are looking for does not exist or has been deleted.</p>
        <Button 
          variant="primary" 
          onClick={() => router.push(ROUTES.adminOrder)}
        >
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
          <p className="text-gray-600">{formatDate(order.created_at)}</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => router.push(ROUTES.adminOrder)}
        >
          Back to Orders
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            </div>
            <div className="px-6 py-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Payment Method</span>
                <span className="text-gray-900">{order.payment_method}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-gray-900 font-medium">{formatPrice(order.total_amount)}</span>
              </div>
              {order.tracking_number && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Tracking Number</span>
                  <span className="text-gray-900">{order.tracking_number}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Order Items</h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <li key={item.id} className="px-6 py-4 flex items-center">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={item.product.images[0]?.url || '/placeholder-product.jpg'}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-base font-medium text-gray-900">{item.product.name}</h3>
                        {item.variant && (
                          <p className="mt-1 text-sm text-gray-500">
                            {item.variant.size && `Size: ${item.variant.size}`}
                            {item.variant.size && item.variant.color && ' / '}
                            {item.variant.color && `Color: ${item.variant.color}`}
                          </p>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(item.price)} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>{formatPrice(order.total_amount)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info and Order Actions */}
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Customer Information</h2>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-900 font-medium">{order.customer_name}</p>
              <p className="text-gray-600">{order.customer_email}</p>
              <p className="text-gray-600">{order.customer_phone}</p>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">Shipping Address</h3>
                <p className="mt-1 text-gray-600 whitespace-pre-line">{order.shipping_address}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Order Actions</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Update Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(status)}
                      disabled={order.status === status || updatingStatus}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        order.status === status
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      } ${getStatusBadgeClass(status)} disabled:opacity-50`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 mb-1">
                  Tracking Number
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="tracking"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter tracking number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                  <Button
                    variant="secondary"
                    onClick={handleUpdateTracking}
                    disabled={updatingStatus}
                    className="ml-3"
                  >
                    Update
                  </Button>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Order Notes
                </label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    rows={3}
                    className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md p-2"
                    placeholder="Add notes about this order"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <Button
                    variant="secondary"
                    onClick={handleUpdateNotes}
                    disabled={updatingStatus}
                    className="mt-2"
                  >
                    Save Notes
                  </Button>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="secondary"
                  onClick={() => window.print()}
                >
                  Print Order
                </Button>
                {order.status !== 'cancelled' && (
                  <Button
                    variant="danger"
                    onClick={() => handleUpdateStatus('cancelled')}
                    disabled={order.status === 'cancelled' || updatingStatus}
                  >
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
