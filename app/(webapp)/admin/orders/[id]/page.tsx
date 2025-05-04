'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../../lib/supabase';
import Loader from '../../../../../app/components/Loader';
import Button from '../../../../components/Button';
import Link from 'next/link';
import { ROUTES } from '@/app/share/routes';

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  price: number;
  product: {
    name: string;
    images: { url: string }[];
  };
  variant: {
    name: string;
    size: string;
    color: string;
  } | null;
}

interface Order {
  id: string;
  created_at: string;
  user_id: string;
  status: string;
  total_amount: number;
  shipping_address: string;
  payment_method: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  tracking_number: string | null;
  notes: string | null;
  items: OrderItem[];
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params) as { id: string };
  const orderId = unwrappedParams.id;

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
        data.items = data.items.map((item: any) => ({
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

  if (loading) {
    return <Loader size="small" fullScreen text="" />;
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Order not found. The order may have been deleted or the ID is incorrect.
              </p>
            </div>
          </div>
        </div>
        <Button variant="primary" onClick={() => router.push(ROUTES.adminOrder)}>
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order #{order.id.substring(0, 8)}</h1>
          <p className="text-sm text-gray-500">Placed on {formatDate(order.created_at)}</p>
        </div>
        <Button variant="outline" onClick={() => router.push(ROUTES.adminOrder)}>
          Back to Orders
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-sm text-gray-500">Status</span>
                  <div className="mt-1">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <Button
                      key={status}
                      variant={order.status === status ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleUpdateStatus(status)}
                      disabled={updatingStatus || order.status === status}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment Information</h3>
                  <p className="mt-1 text-sm text-gray-900">Method: {order.payment_method || 'Not specified'}</p>
                  <p className="mt-1 text-sm text-gray-900">Total: PKR {order.total_amount ? order.total_amount.toLocaleString() : '0'}</p>
                </div>
                {/* <div>
                  <h3 className="text-sm font-medium text-gray-500">Shipping Information</h3>
                  <p className="mt-1 text-sm text-gray-900">{order.shipping_address || 'No address provided'}</p>
                  {order.status === 'shipped' && (
                    <p className="mt-1 text-sm text-gray-900">
                      Tracking: {order.tracking_number || 'Not available'}
                    </p>
                  )}
                </div> */}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tracking Information</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Button
                    variant="secondary"
                    onClick={handleUpdateTracking}
                    disabled={updatingStatus}
                  >
                    Update Tracking
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Order Items</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Variant
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={item.product?.images?.[0]?.url || '/placeholder-product.jpg'}
                              alt={item.product?.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.product?.name}</div>
                            <div className="text-sm text-gray-500">ID: {item.product_id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.variant ? (
                          <div>
                            <div className="text-sm text-gray-900">{item.variant.name}</div>
                            <div className="text-sm text-gray-500">
                              {item.variant.size && `Size: ${item.variant.size}`}
                              {item.variant.size && item.variant.color && ' | '}
                              {item.variant.color && `Color: ${item.variant.color}`}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">No variant</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        PKR {item.price ? item.price.toLocaleString() : '0'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                        PKR {item.price && item.quantity ? (item.price * item.quantity).toLocaleString() : '0'}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                      Total
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                      PKR {order.total_amount ? order.total_amount.toLocaleString() : '0'}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Customer Info & Notes */}
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Customer Information</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1 text-sm text-gray-900">{order.customer_name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-sm text-gray-900">{order.customer_email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1 text-sm text-gray-900">{order.customer_phone}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Order Notes</h2>
            </div>
            <div className="p-6">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this order..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
              />
              <div className="mt-2 flex justify-end">
                <Button
                  variant="secondary"
                  onClick={handleUpdateNotes}
                  disabled={updatingStatus}
                >
                  Save Notes
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => window.print()}
              >
                Print Order
              </Button>
              <Button
                variant={order.status === 'cancelled' ? 'outline' : 'danger'}
                fullWidth
                onClick={() => handleUpdateStatus('cancelled')}
                disabled={order.status === 'cancelled'}
              >
                Cancel Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
