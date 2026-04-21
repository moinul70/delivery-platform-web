'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { get } from '@/lib/api';
import ConfirmModal from '@/app/components/orders/ConfirmOrderModal';

export default function OrderListPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await get('api/v1/orders', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
     
        if (!res) throw new Error('Failed to fetch orders');
        const data = await res.data;
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);
 const handleConfirmed = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => o.id === orderId ? { ...o, status: 'confirmed' } : o)
    );
  };
  return (
    
    <div>
      {/*  Header with create button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">My Orders</h2>
        <button
          onClick={() => router.push('/dashboard/user/orders/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 cursor-pointer"
        >
          + Create Order
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-gray-400 text-sm">Loading orders...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
{selectedOrder && (
        <ConfirmModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onConfirmed={handleConfirmed}
        />
      )}
      {/* Empty state */}
      {!loading && !error && orders.length === 0 && (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-400 mb-4">No orders yet</p>
          <button
            onClick={() => router.push('/dashboard/user/orders/create')}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700"
          >
            + Create your first order
          </button>
        </div>
      )}

      {/*  Order list */}
{!loading && orders.length > 0 && (
  <div className="space-y-3">
    {orders.map((order) => (
      <div key={order.id} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">

        {/* ── Row 1: order number + status + amount ── */}
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-800">Order #{order.order_number}</p>
          <div className="flex items-center gap-3">
            <p className="font-bold text-gray-800">৳{order.payment.amount}</p>
            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
              order.status === 'delivered' ? 'bg-green-50 text-green-600'   :
              order.status === 'pending'   ? 'bg-yellow-50 text-yellow-600' :
              order.status === 'cancelled' ? 'bg-red-50 text-red-500'       :
              'bg-blue-50 text-blue-600'
            }`}>
              {order.status ?? 'pending'}
            </span>
          </div>
        </div>

        {/* ── Row 2: pickup → delivery ── */}
        <p className="text-sm text-gray-400">
          {order.pickup.latitude}, {order.pickup.longitude}
          <span className="mx-2">→</span>
          {order.delivery.latitude}, {order.delivery.longitude}
        </p>

        {/* ── Row 3: dates + driver ── */}
        <div className="flex items-center gap-6 pt-2 border-t border-gray-100 flex-wrap">

          {/* Created at */}
          <div>
            <p className="text-xs text-gray-400">Created</p>
            <p className="text-sm font-bold text-gray-600">
              {order.timeline.created_at
                ? new Date(order.timeline.created_at).toLocaleString()
                : '—'}
            </p>
          </div>

          {/* Assigned at */}
          <div>
            <p className="text-xs text-gray-400">Assigned</p>
            <p className="text-sm font-bold text-gray-600">
              {order.timeline.assigned_at
                ? new Date(order.timeline.assigned_at).toLocaleString()
                : 'Not assigned'}
            </p>
          </div>
          {/* Accepted at */}
          <div>
            <p className="text-xs text-gray-400">Accepted</p>
            <p className="text-sm font-bold text-gray-600">
              {order.timeline.accepted_at
                ? new Date(order.timeline.accepted_at).toLocaleString()
                : 'Not accepted'}
            </p>
          </div>
          {/* Picked up at */}
          <div>
            <p className="text-xs text-gray-400">Picked up</p>
            <p className="text-sm font-bold text-gray-600">
              {order.timeline.picked_up_at
                ? new Date(order.timeline.picked_up_at).toLocaleString()
                : 'Not picked up'}
            </p>
          </div>

          {/* Driver */}
          <div>
            <p className="text-xs text-gray-400">Driver</p>
            <p className="text-sm font-bold text-gray-600">
              {order.driver?.name ?? 'Not assigned'}
            </p>
          </div>
          {/* ✅ confirm button — only show when pending */}
                {order.status === 'delivered' && (
                  <div className="ml-auto">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-blue-700"
                    >
                      Confirm Order
                    </button>
                  </div>
                )}

        </div>
      </div>
    ))}
  </div>
)}
    </div>
  );
}