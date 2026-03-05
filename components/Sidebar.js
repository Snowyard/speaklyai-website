'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Phone,
  Calendar,
  Settings,
  CreditCard,
  LogOut,
} from 'lucide-react';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Call Logs', href: '/dashboard/calls', icon: Phone },
  { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-dark-mid border-r border-slate-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          SpeaklyAI
        </h1>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                active
                  ? 'bg-primary text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-slate-700 space-y-3">
        <div className="px-4 py-2">
          <p className="text-sm text-slate-400">Logged in as</p>
          <p className="font-semibold text-slate-200">Admin User</p>
        </div>
        <button className="w-full flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
