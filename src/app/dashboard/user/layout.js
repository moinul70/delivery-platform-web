'use client';
import useAuthStore from '@/store/authStore';
import useLogout from '@/hooks/useLogout';

export default function DashboardLayout({ children }) {
  const { logout } = useLogout();
  const user = useAuthStore((state) => state.user);

  if (!user) return null;
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 text-xl font-black text-blue-600">MM DASH</div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="/dashboard" className="block p-3 rounded-xl bg-blue-50 text-blue-600 font-bold">Overview</a>
          <a href="/dashboard/orders" className="block p-3 rounded-xl text-gray-600 hover:bg-gray-50 font-bold">My Orders</a>
          <a href="/dashboard/wallet" className="block p-3 rounded-xl text-gray-600 hover:bg-gray-50 font-bold">Wallet</a>
        </nav>
        <div className="p-6 border-t">
          <button onClick={logout} className="text-red-500 font-bold cursor-pointer">Logout</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="font-bold text-gray-800">Welcome,  {user?.name?.toUpperCase() ?? '?'}</h2>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            DJ
          </div>
        </header>
        <div className="p-8">
          {children} {/* This is where the page.js content will load */}
        </div>
      </main>
    </div>
  );
}