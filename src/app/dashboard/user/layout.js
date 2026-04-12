'use client';

import UserSidebar from '@/app/components/sidebar/UserSidebar';
export default function DashboardLayout({ children }) {

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content Area */}
      <main className="flex-1">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
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