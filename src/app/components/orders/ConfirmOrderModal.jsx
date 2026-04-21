// components/orders/ConfirmOrderModal.jsx
'use client';

import { useState } from 'react';
import useAuthStore from '@/store/authStore';

export default function ConfirmOrderModal({ order, onClose, onConfirmed }) {
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/v1/orders/${order.id}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to confirm order');
      onConfirmed(order.id);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Confirm Order</h3>
        <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Order</span>
            <span className="font-bold text-gray-800">#{order.order_number}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Amount</span>
            <span className="font-bold text-gray-800">৳{order.payment.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Pickup</span>
            <span className="font-bold text-gray-800">{order.pickup.latitude}, {order.pickup.longitude}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Delivery</span>
            <span className="font-bold text-gray-800">{order.delivery.latitude}, {order.delivery.longitude}</span>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-3">
          <button onClick={onClose} disabled={loading} className="flex-1 border border-gray-200 text-gray-600 font-bold py-2 rounded-xl hover:bg-gray-50 disabled:opacity-50">
            Cancel
          </button>
          <button onClick={handleConfirm} disabled={loading} className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Confirming...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}