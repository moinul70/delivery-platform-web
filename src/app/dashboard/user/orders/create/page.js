'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { post } from '@/lib/api';

export default function CreateOrderPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const [form, setForm] = useState({
    pickup_latitude:    23.7500,
    pickup_longitude:   90.3800,
    delivery_latitude:  91.3800,
    delivery_longitude: 80.3800,
    amount:             10,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await post('api/v1/orders/create', form, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to create order');

      router.push('/dashboard/user/orders'); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-6 cursor-pointer">Create order</h2>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">

        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pickup location</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Pickup latitude</label>
            <input type="number" name="pickup_latitude" value={form.pickup_latitude} onChange={handleChange} step="0.0001" className="w-full border border-gray-200 rounded-xl px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm text-gray-500">Pickup longitude</label>
            <input type="number" name="pickup_longitude" value={form.pickup_longitude} onChange={handleChange} step="0.0001" className="w-full border border-gray-200 rounded-xl px-3 py-2 mt-1" />
          </div>
        </div>

        <hr className="border-gray-100" />

        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Delivery location</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Delivery latitude</label>
            <input type="number" name="delivery_latitude" value={form.delivery_latitude} onChange={handleChange} step="0.0001" className="w-full border border-gray-200 rounded-xl px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm text-gray-500">Delivery longitude</label>
            <input type="number" name="delivery_longitude" value={form.delivery_longitude} onChange={handleChange} step="0.0001" className="w-full border border-gray-200 rounded-xl px-3 py-2 mt-1" />
          </div>
        </div>

        <hr className="border-gray-100" />

        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payment</p>
        <div>
          <label className="text-sm text-gray-500">Amount (BDT)</label>
          <input type="number" name="amount" value={form.amount} onChange={handleChange} min="1" className="w-full border border-gray-200 rounded-xl px-3 py-2 mt-1 max-w-[180px] block" />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded-xl font-bold hover:opacity-80 disabled:opacity-50 cursor-pointer">
          {loading ? 'Placing order...' : 'Place order'}
        </button>
      </form>
    </div>
  );
}