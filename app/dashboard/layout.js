'use client';

import AuthGuard from '@/components/AuthGuard';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-dark">
        <Sidebar />
        <main className="flex-1 ml-64 overflow-auto bg-dark">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
