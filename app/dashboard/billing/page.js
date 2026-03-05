'use client';

import { CreditCard, Download, Calendar, Clock } from 'lucide-react';

const invoices = [
  {
    id: 'INV-2024-003',
    date: '2024-02-01',
    amount: '$49.00',
    status: 'Paid',
  },
  {
    id: 'INV-2024-002',
    date: '2024-01-01',
    amount: '$49.00',
    status: 'Paid',
  },
  {
    id: 'INV-2023-012',
    date: '2023-12-01',
    amount: '$49.00',
    status: 'Paid',
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Billing</h1>
        <p className="text-slate-400">Manage your subscription and billing information.</p>
      </div>

      {/* Current Plan */}
      <div className="bg-dark-mid border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Current Plan</h2>

        <div className="bg-gradient-to-r from-primary/20 to-primary-light/20 border border-primary/30 rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                SpeaklyAI Pro
              </h3>
              <p className="text-slate-400">
                Unlimited calls • Advanced analytics • Priority support
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary">$49</p>
              <p className="text-sm text-slate-400">/month</p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-300 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Unlimited incoming calls</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>500 minutes/month included</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Advanced call analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Custom business hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Priority support</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-slate-300 text-sm">
              <Calendar size={16} className="text-primary" />
              <span>Next billing: Mar 1, 2024</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-sm">
              <CreditCard size={16} className="text-primary" />
              <span>Visa ending 4242</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 px-4 py-2 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors font-medium">
            Manage Subscription
          </button>
          <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium">
            Update Payment Method
          </button>
        </div>
      </div>

      {/* Usage */}
      <div className="bg-dark-mid border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Usage This Month</h2>

        <div className="mb-6">
          <div className="flex items-end justify-between mb-2">
            <p className="text-slate-300">Minutes used</p>
            <p className="text-2xl font-bold text-primary">156 <span className="text-sm text-slate-400">/500</span></p>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-primary-light h-full rounded-full"
              style={{ width: '31.2%' }}
            ></div>
          </div>

          <p className="text-sm text-slate-400 mt-2">344 minutes remaining</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
            <p className="text-sm text-slate-400 mb-2">Total Calls</p>
            <p className="text-2xl font-bold text-white">1,240</p>
          </div>
          <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
            <p className="text-sm text-slate-400 mb-2">Avg Call Duration</p>
            <p className="text-2xl font-bold text-white">7.6s</p>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-dark-mid border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Invoice History</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                  Invoice ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-slate-300">
                    {invoice.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-300">
                    {new Date(invoice.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-white">
                    {invoice.amount}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-medium">
                      <Download size={16} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-dark-mid border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Payment Method</h2>

        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg mb-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-blue-400 rounded flex items-center justify-center text-xs font-bold">
              VISA
            </div>
            <div>
              <p className="text-sm text-blue-100">Visa Card</p>
              <p className="text-lg font-semibold">**** **** **** 4242</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Expires</p>
            <p className="font-semibold">12/26</p>
          </div>
        </div>

        <button className="w-full px-4 py-2 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors font-medium">
          Edit Payment Method
        </button>
      </div>

      {/* Billing Contact */}
      <div className="bg-dark-mid border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Billing Contact</h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-400 mb-1">Email Address</p>
            <p className="text-white">admin@elitehairstudio.com</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Company Name</p>
            <p className="text-white">Elite Hair Salon</p>
          </div>
          <button className="px-4 py-2 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors font-medium">
            Edit Billing Contact
          </button>
        </div>
      </div>
    </div>
  );
}
