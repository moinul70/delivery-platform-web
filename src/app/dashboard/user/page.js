export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black text-gray-900">Activity Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Active Orders</p>
          <h3 className="text-4xl font-black mt-2 text-blue-600">03</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Wallet Balance</p>
          <h3 className="text-4xl font-black mt-2 text-green-600">$450.00</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Deliveries</p>
          <h3 className="text-4xl font-black mt-2 text-gray-900">128</h3>
        </div>
      </div>

      {/* Active Delivery Card (Design Placeholder) */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 flex items-center justify-between border-b border-gray-50">
          <div>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">In Transit</span>
            <h4 className="text-xl font-bold mt-2">Order #MM-8291</h4>
          </div>
          <button className="text-blue-600 font-bold hover:underline">Track on Map →</button>
        </div>
        <div className="p-8 bg-blue-50/30">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">🍕</div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Estimated Arrival</p>
              <p className="text-lg font-black text-gray-900">12:45 PM (15 mins)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}