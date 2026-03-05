'use client';

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Phone, Calendar, Clock, Star, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend }) => (
  <div className="bg-dark-mid border border-slate-700 rounded-xl p-6 hover:border-primary/50 transition-all duration-200">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-slate-400 text-sm mb-2">{label}</p>
        <p className="text-3xl font-bold text-white mb-2">{value}</p>
        <div className="flex items-center gap-1 text-accent text-sm font-medium">
          <TrendingUp size={16} />
          <span>+{trend}% this week</span>
        </div>
      </div>
      <div className="p-3 bg-primary/20 rounded-lg">
        <Icon size={24} className="text-primary" />
      </div>
    </div>
  </div>
);

const barChartData = [
  { day: 'Mon', calls: 32 },
  { day: 'Tue', calls: 45 },
  { day: 'Wed', calls: 38 },
  { day: 'Thu', calls: 52 },
  { day: 'Fri', calls: 48 },
  { day: 'Sat', calls: 28 },
  { day: 'Sun', calls: 15 },
];

const pieChartData = [
  { name: 'Appointments', value: 45, color: '#6C3AED' },
  { name: 'General Inquiry', value: 25, color: '#8B5CF6' },
  { name: 'Hours/Location', value: 15, color: '#10B981' },
  { name: 'Emergency', value: 10, color: '#EF4444' },
  { name: 'Other', value: 5, color: '#8B5CF6' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">Welcome back! Here's your performance snapshot.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Phone}
          label="Total Calls"
          value="1,240"
          trend="12"
        />
        <StatCard
          icon={Calendar}
          label="Appointments Booked"
          value="156"
          trend="8"
        />
        <StatCard
          icon={Clock}
          label="Avg Call Duration"
          value="3m 24s"
          trend="5"
        />
        <StatCard
          icon={Star}
          label="Customer Satisfaction"
          value="4.8/5"
          trend="3"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-dark-mid border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Calls This Week</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
                cursor={{ fill: '#6C3AED', fillOpacity: 0.1 }}
              />
              <Bar dataKey="calls" fill="#6C3AED" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-dark-mid border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Call Types</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="mt-4 space-y-2">
            {pieChartData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-slate-300">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
