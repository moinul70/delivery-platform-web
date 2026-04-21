// components/sidebar/UserSidebar.jsx
'use client';

import { usePathname } from 'next/navigation';
import useLogout from '@/hooks/useLogout';
import useAuthStore from '@/store/authStore';

export default function UserSidebar() {
  const { logout } = useLogout();
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();

  const navClass = (href) =>
    `block p-3 rounded-xl font-bold transition-colors ${
      pathname === href
        ? 'bg-blue-50 text-blue-600'
        : 'text-gray-600 hover:bg-gray-50'
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="p-6 text-xl font-black text-blue-600">MM DASH</div>

      <nav className="flex-1 px-4 space-y-2">
        <a href="/dashboard/user"               className={navClass('/dashboard/user')}>Overview</a>
        <a href="/dashboard/user/orders"        className={navClass('/dashboard/user/orders')}>My Orders</a>
        <a href="/dashboard/user/wallet"        className={navClass('/dashboard/user/wallet')}>Wallet</a>
      </nav>

      <div className="p-4 border-t flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">
          {user?.name?.charAt(0).toUpperCase() ?? '?'}
        </div>
        <div className="overflow-hidden">
          <p className="font-bold text-gray-800 truncate">{user?.name ?? 'Unknown'}</p>
          <p className="text-xs text-gray-400 truncate">{user?.email ?? ''}</p>
        </div>
      </div>

      <div className="px-6 pb-6">
        <button onClick={logout} className="w-full text-red-500 font-bold border border-red-200 rounded-xl py-2 hover:bg-red-50">
          Logout
        </button>
      </div>
    </aside>
  );
}