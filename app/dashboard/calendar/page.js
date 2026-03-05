'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Phone, User } from 'lucide-react';

const appointments = [
  {
    id: 1,
    date: new Date(2024, 1, 5),
    time: '10:00 AM',
    customerName: 'Sarah Johnson',
    serviceType: 'Haircut',
    phone: '+1 (555) 123-4567',
  },
  {
    id: 2,
    date: new Date(2024, 1, 5),
    time: '2:30 PM',
    customerName: 'Michael Chen',
    serviceType: 'Color & Style',
    phone: '+1 (555) 234-5678',
  },
  {
    id: 3,
    date: new Date(2024, 1, 7),
    time: '9:15 AM',
    customerName: 'Emma Wilson',
    serviceType: 'Dental Cleaning',
    phone: '+1 (555) 345-6789',
  },
  {
    id: 4,
    date: new Date(2024, 1, 7),
    time: '1:00 PM',
    customerName: 'James Martinez',
    serviceType: 'Root Canal',
    phone: '+1 (555) 456-7890',
  },
  {
    id: 5,
    date: new Date(2024, 1, 10),
    time: '11:30 AM',
    customerName: 'Lisa Anderson',
    serviceType: 'Plumbing Inspection',
    phone: '+1 (555) 567-8901',
  },
  {
    id: 6,
    date: new Date(2024, 1, 12),
    time: '3:00 PM',
    customerName: 'David Brown',
    serviceType: 'Haircut',
    phone: '+1 (555) 678-9012',
  },
  {
    id: 7,
    date: new Date(2024, 1, 15),
    time: '10:00 AM',
    customerName: 'Rachel Green',
    serviceType: 'Styling Consultation',
    phone: '+1 (555) 789-0123',
  },
  {
    id: 8,
    date: new Date(2024, 1, 20),
    time: '2:00 PM',
    customerName: 'Tom Wilson',
    serviceType: 'Dental Checkup',
    phone: '+1 (555) 890-1234',
  },
];

const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const isSameDay = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const getAppointmentsForDate = (date) => {
  return appointments.filter((apt) => isSameDay(apt.date, date));
};

const formatMonthYear = (date) => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 1, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 1, 5));

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const selectedDayAppointments = getAppointmentsForDate(selectedDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Calendar</h1>
        <p className="text-slate-400">View and manage your appointments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-dark-mid border border-slate-700 rounded-xl p-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {formatMonthYear(currentDate)}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ChevronLeft size={20} className="text-slate-300" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ChevronRight size={20} className="text-slate-300" />
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-slate-400 text-sm py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((date, idx) => {
              if (!date) {
                return (
                  <div key={`empty-${idx}`} className="aspect-square"></div>
                );
              }

              const isSelected = isSameDay(date, selectedDate);
              const hasAppointments = getAppointmentsForDate(date).length > 0;
              const isToday = isSameDay(date, new Date());

              return (
                <button
                  key={date.getDate()}
                  onClick={() => setSelectedDate(date)}
                  className={`aspect-square p-2 rounded-lg border transition-all duration-200 text-sm font-medium relative ${
                    isSelected
                      ? 'bg-primary border-primary text-white'
                      : isToday
                      ? 'border-accent bg-slate-800'
                      : 'border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <div className={isSelected ? 'text-white' : 'text-slate-300'}>
                    {date.getDate()}
                  </div>
                  {hasAppointments && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {getAppointmentsForDate(date).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-white' : 'bg-accent'
                          }`}
                        ></div>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Appointments Panel */}
        <div className="bg-dark-mid border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </h3>

          {selectedDayAppointments.length > 0 ? (
            <div className="space-y-4">
              {selectedDayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg hover:border-primary/50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-white">{apt.customerName}</p>
                      <p className="text-sm text-slate-400">{apt.serviceType}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock size={16} className="text-primary" />
                      <span>{apt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone size={16} className="text-primary" />
                      <span>{apt.phone}</span>
                    </div>
                  </div>

                  <button className="mt-3 w-full px-3 py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg text-sm font-medium transition-colors">
                    Edit Appointment
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-slate-400 text-sm">
                No appointments scheduled for this day.
              </p>
            </div>
          )}

          {/* Add Appointment Button */}
          <button className="w-full mt-6 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors">
            + Add Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
