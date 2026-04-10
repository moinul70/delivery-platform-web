export default function ActiveOrder() {
  return (
    <div className="max-w-xl mx-auto p-8">
      <div className="bg-white rounded-[2rem] border p-8 shadow-xl">
        <span className="text-blue-600 font-bold uppercase text-xs tracking-widest">Ongoing Delivery</span>
        <h2 className="text-4xl font-black mt-2">Order #MM-101</h2>
        
        <div className="mt-8 space-y-4">
          <div className="flex justify-between border-b pb-4">
            <span className="text-gray-500">Pickup</span>
            <span className="font-bold">Gulshan Avenue</span>
          </div>
          <div className="flex justify-between border-b pb-4">
            <span className="text-gray-500">Destination</span>
            <span className="font-bold">Banani Gate 4</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="bg-gray-100 py-4 rounded-xl font-bold">Call Customer</button>
          <button className="bg-blue-600 text-white py-4 rounded-xl font-bold">Update Status</button>
        </div>
      </div>
    </div>
  );
}