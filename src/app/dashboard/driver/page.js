'use client';

import { useState } from 'react';

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Stats Bar */}
      <div className="bg-blue-600 p-8 pt-12 pb-20 rounded-b-[3rem] text-white">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <p className="text-blue-100 text-sm font-bold uppercase tracking-wider">Today's Earnings</p>
            <h1 className="text-5xl font-black mt-1">$142.50</h1>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm font-bold uppercase tracking-wider">Trips</p>
            <h1 className="text-3xl font-black mt-1">12</h1>
          </div>
        </div>
      </div>

      {/* Online/Offline Toggle Card */}
      <div className="max-w-md mx-auto -mt-10 px-4">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-black text-xl text-gray-900">
              {isOnline ? "You're Online" : "You're Offline"}
            </h3>
            <p className="text-gray-500 text-sm">
              {isOnline ? "Searching for nearby orders..." : "Go online to start earning"}
            </p>
          </div>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`w-16 h-8 rounded-full p-1 transition-colors duration-300 ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isOnline ? 'translate-x-8' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">⭐</div>
            <p className="text-sm font-bold text-gray-400 uppercase">Rating</p>
            <p className="text-xl font-black">4.92</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">💳</div>
            <p className="text-sm font-bold text-gray-400 uppercase">Wallet</p>
            <p className="text-xl font-black">$850</p>
          </div>
        </div>

        {/* Recent Activity / Order Feed */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-black text-gray-900">Recent Trips</h2>
            <button className="text-blue-600 font-bold text-sm">View All</button>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl text-blue-600 font-bold">
                  #
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Banani → Gulshan</p>
                  <p className="text-xs text-gray-500 font-medium">Completed • 2:30 PM</p>
                </div>
                <div className="text-right font-black text-green-600">
                  +$12.00
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}