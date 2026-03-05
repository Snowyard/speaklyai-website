'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState('Elite Hair Salon');
  const [businessPhone, setBusinessPhone] = useState('+1 (555) 123-4567');
  const [businessAddress, setBusinessAddress] = useState('123 Main St, New York, NY 10001');
  const [website, setWebsite] = useState('www.elitehairstudio.com');

  const [businessHours, setBusinessHours] = useState({
    Monday: { open: '09:00', close: '18:00', isOpen: true },
    Tuesday: { open: '09:00', close: '18:00', isOpen: true },
    Wednesday: { open: '09:00', close: '18:00', isOpen: true },
    Thursday: { open: '09:00', close: '20:00', isOpen: true },
    Friday: { open: '09:00', close: '20:00', isOpen: true },
    Saturday: { open: '10:00', close: '17:00', isOpen: true },
    Sunday: { open: '00:00', close: '00:00', isOpen: false },
  });

  const [services, setServices] = useState([
    { id: 1, name: 'Haircut', duration: '30 min' },
    { id: 2, name: 'Color & Style', duration: '90 min' },
    { id: 3, name: 'Styling Consultation', duration: '45 min' },
  ]);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDuration, setNewServiceDuration] = useState('60 min');

  const [voiceStyle, setVoiceStyle] = useState('Professional');
  const [greeting, setGreeting] = useState('Hello! Welcome to Elite Hair Salon. How can I help you today?');
  const [language, setLanguage] = useState('English');

  const [forwardEmergency, setForwardEmergency] = useState(true);
  const [afterHoursVoicemail, setAfterHoursVoicemail] = useState(true);
  const [smsConfirmations, setSmsConfirmations] = useState(true);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddService = () => {
    if (newServiceName.trim()) {
      setServices([
        ...services,
        {
          id: Math.max(...services.map(s => s.id), 0) + 1,
          name: newServiceName,
          duration: newServiceDuration,
        },
      ]);
      setNewServiceName('');
      setNewServiceDuration('60 min');
    }
  };

  const handleRemoveService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleTimeChange = (day, field, value) => {
    setBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day],
        [field]: value,
      },
    });
  };

  const handleToggleOpen = (day) => {
    setBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day],
        isOpen: !businessHours[day].isOpen,
      },
    });
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Business Settings</h1>
        <p className="text-slate-400">Configure your business information and AI voice settings.</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="p-4 bg-accent/20 border border-accent rounded-lg text-accent font-medium">
          Settings saved successfully!
        </div>
      )}

      {/* Business Info */}
      <div className="bg-dark-mid border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Business Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Business Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Business Phone
            </label>
            <input
              type="tel"
              value={businessPhone}
              onChange={(e) => setBusinessPhone(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Business Address
            </label>
            <input
              type="text"
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Website
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-dark-mid border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Business Hours</h2>
        <div className="space-y-3">
          {days.map((day) => (
            <div key={day} className="flex items-center gap-4">
              <div className="w-24">
                <p className="text-sm font-medium text-slate-300">{day}</p>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="time"
                  value={businessHours[day].open}
                  onChange={(e) => handleTimeChange(day, 'open', e.target.value)}
                  disabled={!businessHours[day].isOpen}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                />
                <span className="text-slate-400">to</span>
                <input
                  type="time"
                  value={businessHours[day].close}
                  onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                  disabled={!businessHours[day].isOpen}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                />
              </div>
              <button
                onClick={() => handleToggleOpen(day)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  businessHours[day].isOpen
                    ? 'bg-accent/20 text-accent hover:bg-accent/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {businessHours[day].isOpen ? 'Open' : 'Closed'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="bg-dark-mid border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Services</h2>
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg"
            >
              <div>
                <p className="font-medium text-white">{service.name}</p>
                <p className="text-sm text-slate-400">{service.duration}</p>
              </div>
              <button
                onClick={() => handleRemoveService(service.id)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
              >
                <X size={18} />
              </button>
            </div>
          ))}

          {/* Add Service */}
          <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg space-y-3">
            <input
              type="text"
              placeholder="Service name..."
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              className="w-full px-4 py-2 bg-dark border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Duration (e.g., 30 min, 1 hour)..."
                value={newServiceDuration}
                onChange={(e) => setNewServiceDuration(e.target.value)}
                className="flex-1 px-4 py-2 bg-dark border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                onClick={handleAddService}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Voice Settings */}
      <div className="bg-dark-mid border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">AI Voice Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Voice Style
            </label>
            <select
              value={voiceStyle}
              onChange={(e) => setVoiceStyle(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
            >
              <option>Friendly</option>
              <option>Professional</option>
              <option>Casual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Greeting Message
            </label>
            <textarea
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors resize-none"
            />
            <p className="text-xs text-slate-400 mt-2">
              This is what callers hear when they first reach your business.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Mandarin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Call Routing Rules */}
      <div className="bg-dark-mid border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Call Routing Rules</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-slate-900/50 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={forwardEmergency}
              onChange={(e) => setForwardEmergency(e.target.checked)}
              className="w-5 h-5 rounded border-slate-600 text-primary cursor-pointer"
            />
            <div>
              <p className="font-medium text-white">Forward emergency calls</p>
              <p className="text-sm text-slate-400">
                Automatically transfer emergency calls to your team
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-slate-900/50 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={afterHoursVoicemail}
              onChange={(e) => setAfterHoursVoicemail(e.target.checked)}
              className="w-5 h-5 rounded border-slate-600 text-primary cursor-pointer"
            />
            <div>
              <p className="font-medium text-white">After-hours voicemail</p>
              <p className="text-sm text-slate-400">
                Enable voicemail greeting during closed hours
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-slate-900/50 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={smsConfirmations}
              onChange={(e) => setSmsConfirmations(e.target.checked)}
              className="w-5 h-5 rounded border-slate-600 text-primary cursor-pointer"
            />
            <div>
              <p className="font-medium text-white">SMS confirmations</p>
              <p className="text-sm text-slate-400">
                Send appointment confirmations via SMS
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-2 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors font-medium">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
