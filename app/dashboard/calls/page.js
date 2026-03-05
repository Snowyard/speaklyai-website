'use client';

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const callData = [
  {
    id: 1,
    dateTime: '2024-02-28 10:30 AM',
    caller: '+1 (555) 123-4567',
    duration: '4m 22s',
    type: 'Appointment',
    outcome: 'Resolved',
    transcript: [
      { speaker: 'Caller', message: 'Hi, I\'d like to schedule an appointment for a haircut.' },
      { speaker: 'SpeaklyAI', message: 'Of course! I\'d be happy to help you schedule an appointment. What date and time work best for you?' },
      { speaker: 'Caller', message: 'How about next Tuesday at 2 PM?' },
      { speaker: 'SpeaklyAI', message: 'Perfect! I\'ve booked you for next Tuesday at 2 PM. Your confirmation number is APP-45892. Is there anything else I can help you with?' },
      { speaker: 'Caller', message: 'No, that\'s all. Thank you!' },
      { speaker: 'SpeaklyAI', message: 'You\'re welcome! We look forward to seeing you. Have a great day!' },
    ],
  },
  {
    id: 2,
    dateTime: '2024-02-28 11:15 AM',
    caller: '+1 (555) 234-5678',
    duration: '2m 11s',
    type: 'Inquiry',
    outcome: 'Transferred',
    transcript: [
      { speaker: 'Caller', message: 'What are your hours on Saturday?' },
      { speaker: 'SpeaklyAI', message: 'We\'re open on Saturday from 9 AM to 6 PM. Is there anything else I can help you with?' },
      { speaker: 'Caller', message: 'Can I speak to someone about pricing?' },
      { speaker: 'SpeaklyAI', message: 'Of course! Let me transfer you to our pricing specialist.' },
    ],
  },
  {
    id: 3,
    dateTime: '2024-02-28 02:45 PM',
    caller: '+1 (555) 345-6789',
    duration: '1m 33s',
    type: 'Inquiry',
    outcome: 'Resolved',
    transcript: [
      { speaker: 'Caller', message: 'Do you offer emergency services?' },
      { speaker: 'SpeaklyAI', message: 'Yes, we offer emergency services. For urgent matters, please call our emergency line at 555-911-HELP.' },
      { speaker: 'Caller', message: 'Thank you!' },
      { speaker: 'SpeaklyAI', message: 'You\'re welcome. Have a good day!' },
    ],
  },
  {
    id: 4,
    dateTime: '2024-02-27 09:20 AM',
    caller: '+1 (555) 456-7890',
    duration: '3m 47s',
    type: 'Appointment',
    outcome: 'Resolved',
    transcript: [
      { speaker: 'Caller', message: 'I need to reschedule my appointment from Friday.' },
      { speaker: 'SpeaklyAI', message: 'I can help with that. What new date and time would you prefer?' },
      { speaker: 'Caller', message: 'How about Wednesday at 10 AM instead?' },
      { speaker: 'SpeaklyAI', message: 'Wednesday at 10 AM is confirmed. Your new confirmation is APP-45871.' },
      { speaker: 'Caller', message: 'Perfect, thanks!' },
    ],
  },
  {
    id: 5,
    dateTime: '2024-02-27 01:30 PM',
    caller: '+1 (555) 567-8901',
    duration: '5m 12s',
    type: 'Emergency',
    outcome: 'Transferred',
    transcript: [
      { speaker: 'Caller', message: 'I have an emergency, I need urgent help!' },
      { speaker: 'SpeaklyAI', message: 'I\'m connecting you to our emergency team right now.' },
      { speaker: 'Caller', message: 'Thank you, hurry please!' },
      { speaker: 'SpeaklyAI', message: 'You\'re being transferred now. Stay on the line.' },
    ],
  },
  {
    id: 6,
    dateTime: '2024-02-27 03:15 PM',
    caller: '+1 (555) 678-9012',
    duration: '2m 05s',
    type: 'Inquiry',
    outcome: 'Voicemail',
    transcript: [
      { speaker: 'Caller', message: 'Hello? Is anyone there?' },
      { speaker: 'SpeaklyAI', message: 'Hello! Thank you for calling. Due to high call volume, please leave a message and we\'ll get back to you soon.' },
    ],
  },
  {
    id: 7,
    dateTime: '2024-02-26 10:00 AM',
    caller: '+1 (555) 789-0123',
    duration: '3m 28s',
    type: 'Appointment',
    outcome: 'Resolved',
    transcript: [
      { speaker: 'Caller', message: 'Hi, I\'d like to book a dental cleaning.' },
      { speaker: 'SpeaklyAI', message: 'Great! I can help you with that. Our next available appointment is on March 5th at 2 PM.' },
      { speaker: 'Caller', message: 'That works perfectly!' },
      { speaker: 'SpeaklyAI', message: 'Excellent! You\'re all booked. Confirmation APP-45823.' },
    ],
  },
  {
    id: 8,
    dateTime: '2024-02-26 04:45 PM',
    caller: '+1 (555) 890-1234',
    duration: '1m 52s',
    type: 'Inquiry',
    outcome: 'Resolved',
    transcript: [
      { speaker: 'Caller', message: 'What forms of payment do you accept?' },
      { speaker: 'SpeaklyAI', message: 'We accept all major credit cards, debit cards, and online payment services.' },
      { speaker: 'Caller', message: 'Perfect, thank you!' },
    ],
  },
];

const getTypeBadgeColor = (type) => {
  switch (type) {
    case 'Appointment':
      return 'bg-primary/20 text-primary';
    case 'Inquiry':
      return 'bg-accent/20 text-accent';
    case 'Emergency':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-slate-700/20 text-slate-300';
  }
};

const getOutcomeBadgeColor = (outcome) => {
  switch (outcome) {
    case 'Resolved':
      return 'bg-accent/20 text-accent';
    case 'Transferred':
      return 'bg-primary/20 text-primary';
    case 'Voicemail':
      return 'bg-slate-700/20 text-slate-300';
    default:
      return 'bg-slate-700/20 text-slate-300';
  }
};

export default function CallLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [expandedCallId, setExpandedCallId] = useState(null);

  const filteredCalls = callData.filter((call) => {
    const matchesSearch =
      call.caller.includes(searchQuery) ||
      call.dateTime.includes(searchQuery);
    const matchesFilter =
      filterType === 'All' ||
      (filterType === 'Appointments' && call.type === 'Appointment') ||
      (filterType === 'Inquiries' && call.type === 'Inquiry') ||
      (filterType === 'Emergencies' && call.type === 'Emergency');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Call Logs</h1>
        <p className="text-slate-400">Review and manage your call history.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-slate-500" size={20} />
          <input
            type="text"
            placeholder="Search by caller number or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark-mid border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="relative">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-dark-mid border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors appearance-none pr-10"
          >
            <option>All</option>
            <option>Appointments</option>
            <option>Inquiries</option>
            <option>Emergencies</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-3 text-slate-500 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      {/* Call Table */}
      <div className="bg-dark-mid border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Date/Time
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Caller
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Outcome
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCalls.map((call) => (
                <tbody key={call.id}>
                  <tr className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {call.dateTime}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {call.caller}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {call.duration}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(
                          call.type
                        )}`}
                      >
                        {call.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getOutcomeBadgeColor(
                          call.outcome
                        )}`}
                      >
                        {call.outcome}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() =>
                          setExpandedCallId(
                            expandedCallId === call.id ? null : call.id
                          )
                        }
                        className="text-primary hover:text-primary-light transition-colors font-medium"
                      >
                        {expandedCallId === call.id ? 'Hide' : 'View'}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Transcript */}
                  {expandedCallId === call.id && (
                    <tr className="border-b border-slate-700 bg-slate-900/30">
                      <td colSpan="6" className="px-6 py-6">
                        <div className="space-y-4">
                          <h3 className="font-semibold text-white mb-4">
                            Call Transcript
                          </h3>
                          <div className="space-y-3 max-h-96 overflow-y-auto">
                            {call.transcript.map((msg, idx) => (
                              <div
                                key={idx}
                                className={`p-4 rounded-lg ${
                                  msg.speaker === 'SpeaklyAI'
                                    ? 'bg-primary/10 border-l-4 border-primary'
                                    : 'bg-slate-800/50 border-l-4 border-slate-600'
                                }`}
                              >
                                <p className="text-xs font-semibold text-slate-300 mb-1">
                                  {msg.speaker}
                                </p>
                                <p className="text-slate-200">{msg.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCalls.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-slate-400">No calls found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
