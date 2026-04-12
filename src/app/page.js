'use client';

import React, { useState } from 'react';
import Link from 'next/link';
const appName = process.env.APP_NAME || 'Goti Delivery Platform';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('user');

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-700">

      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
              <button className="font-bold text-gray-700 hover:text-blue-600 cursor-pointer">{appName}</button>
            </Link>
          <div className="hidden md:flex space-x-10 text-sm font-bold uppercase tracking-widest text-gray-500">
            <a href="#services" className="hover:text-blue-600 transition">Services</a>
            <a href="#fleet" className="hover:text-blue-600 transition">Fleet</a>
            <a href="#contact" className="hover:text-blue-600 transition">Support</a>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/login">
              <button className="cursor-pointer font-bold text-gray-700 hover:text-blue-600">Login</button>
            </Link>
            <button className="cursor-pointer bg-gray-900 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 transition shadow-lg shadow-blue-200">
              Join Now
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-600 text-sm font-bold">
              <span>🚀</span>
              <span>Voted #1 Delivery Platform in 2026</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight">
              Move anything, <br />
              <span className="text-blue-600">anywhere.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
              Real-time logistics powered by a decoupled matching engine. Reliable, transparent, and lightning fast.
            </p>

            {/* Action Tabs */}
            <div className="bg-gray-100 p-2 rounded-2xl inline-flex mb-4">
              <button
                onClick={() => setActiveTab('user')}
                className={`px-8 py-3 rounded-xl font-bold transition ${activeTab === 'user' ? 'bg-white shadow-md text-blue-600' : 'text-gray-500'}`}
              >
                For Customers
              </button>
              <button
                onClick={() => setActiveTab('driver')}
                className={`px-8 py-3 rounded-xl font-bold transition ${activeTab === 'driver' ? 'bg-white shadow-md text-blue-600' : 'text-gray-500'}`}
              >
                For Drivers
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white text-lg px-10 py-5 rounded-2xl font-black hover:bg-blue-700 transition transform hover:-translate-y-1 shadow-2xl shadow-blue-200">
                {activeTab === 'user' ? 'Start Shipping' : 'Start Earning'}
              </button>
              <button className="bg-white border-2 border-gray-200 text-lg px-10 py-5 rounded-2xl font-black hover:border-blue-600 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Visual Element: Modern Glass Card */}
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="relative bg-white/40 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[2rem] flex items-center justify-center overflow-hidden">
                <div className="text-white text-9xl font-black opacity-20">MM</div>
                {/* You can place a high-res delivery illustration here */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features (The "Bento" Grid) --- */}
      <section id="services" className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-10 rounded-[2rem] border border-gray-100 flex flex-col justify-between hover:shadow-xl transition">
              <h3 className="text-3xl font-black">Real-time GPS <br />Precision</h3>
              <p className="text-gray-500 mt-4 max-w-sm">Every driver is tracked with millisecond accuracy using our custom WebSocket layer.</p>
              <div className="mt-8 h-32 bg-blue-50 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400/20 to-transparent"></div>
              </div>
            </div>
            <div className="bg-blue-600 p-10 rounded-[2rem] text-white flex flex-col justify-between">
              <h3 className="text-3xl font-black">24/7 <br />Dispatch</h3>
              <p className="text-blue-100 mt-4 text-sm">Automated order matching ensures no request goes unanswered.</p>
              <div className="text-5xl mt-6">⚡</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}