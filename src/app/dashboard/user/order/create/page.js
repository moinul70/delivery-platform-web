export default function CreateOrderPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-black mb-8">Create New Order</h1>
      <form className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <label className="block text-sm font-bold text-gray-700">Pickup Address</label>
          <input className="w-full mt-2 p-4 bg-gray-50 rounded-xl" placeholder="Enter pickup location..." />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Delivery Address</label>
          <input className="w-full mt-2 p-4 bg-gray-50 rounded-xl" placeholder="Enter delivery location..." />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Package Details</label>
          <textarea className="w-full mt-2 p-4 bg-gray-50 rounded-xl" placeholder="What are you sending?"></textarea>
        </div>
        <button className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700">
          Request Delivery
        </button>
      </form>
    </div>
  );
}