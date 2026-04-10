export default function DriverOrder() {
  // Mock data - eventually replaced by your Laravel API
  const orders = [
    { id: 'MM-101', pickup: 'Gulshan', drop: 'Banani', price: '$5.00' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-black mb-8">Available Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-2xl border flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400">ORDER {order.id}</p>
              <p className="text-lg font-bold">{order.pickup} → {order.drop}</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-red-50 text-red-600 px-6 py-2 rounded-lg font-bold">Reject</button>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold">Accept</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}