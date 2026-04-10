'use client';

// pages/auth/login.js
import { post } from '../../lib/api'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to customer
  const [error, setError] = useState(null);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(false);



  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await post('api/v1/login', { email, password });

      // save token + user to store (also persisted to localStorage)
      setAuth(data.token, data.user);
      Cookies.set('token', data.token, { secure: true, sameSite: 'strict' });
      Cookies.set('role', role, { secure: true, sameSite: 'strict' });

      router.push(`/dashboard/${role}`);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-gray-100">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Log in to your Mochor Delivery Platform account</p>
        </div>

        {/* Role Selection */}
        <div className="flex p-1 bg-gray-100 rounded-2xl mb-8">
          <button
            onClick={() => setRole('user')}
            className={`flex-1 py-3 rounded-xl cursor-pointer font-bold transition ${role === 'user' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
          >Customer</button>
          <button
            onClick={() => setRole('driver')}
            className={`flex-1 py-3 cursor-pointer rounded-xl font-bold transition ${role === 'driver' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-800'}`}
          >Driver</button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold">{error}</div>}

          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder={role}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button className="w-full cursor-pointer bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-100">
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 text-sm">
          New to the platform? <span className="text-blue-600 font-bold cursor-pointer hover:underline">Create an account</span>
        </p>
      </div>
    </div>
  );
}