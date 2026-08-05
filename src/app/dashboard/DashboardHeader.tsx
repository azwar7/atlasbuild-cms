'use client';

import { useState } from 'react';
import AccountProfileDropdown from '@/components/AccountProfileDropdown';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  icon: string;
}

export default function DashboardHeader({
  onSearchChange,
}: {
  onSearchChange?: (query: string) => void;
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'New RFP Submission',
      desc: 'Eastside Logistics Center proposal logged by Elena Rostova',
      time: '2 mins ago',
      unread: true,
      icon: 'mail'
    },
    {
      id: 'n2',
      title: 'OSHA Safety Audit Passed',
      desc: 'Site inspection verified with 0.71 EMR rating',
      time: '1 hour ago',
      unread: true,
      icon: 'health_and_safety'
    },
    {
      id: 'n3',
      title: 'CAD Vector Blueprint Rev3',
      desc: 'Structural steel elevation drawing uploaded to Vault',
      time: '3 hours ago',
      unread: true,
      icon: 'description'
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (onSearchChange) onSearchChange(q);
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="fixed top-0 left-[220px] right-0 h-16 bg-[#7dd3fc]/5 backdrop-blur-[24px] border-b border-[#7dd3fc]/20 shadow-[0_0_15px_rgba(125,211,252,0.05)] z-40 flex items-center justify-end px-8 gap-6">
      
      {/* Controls Container Pushed to Far Right */}
      <div className="flex items-center gap-6 text-white/80">

        {/* Search Input / Quick Search Bar */}
        {showSearch ? (
          <div className="relative w-72 flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#7dd3fc] text-[18px]">search</span>
            <input 
              type="text"
              autoFocus
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search projects, companies..."
              className="w-full bg-[#7dd3fc]/10 border border-[#7dd3fc]/30 text-white text-xs font-mono rounded-lg pl-9 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-[#7dd3fc]"
            />
            <button 
              type="button" 
              onClick={() => { setShowSearch(false); setSearchQuery(''); if (onSearchChange) onSearchChange(''); }}
              className="absolute right-2 text-white/70 hover:text-white"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        ) : (
          <button 
            type="button"
            onClick={() => setShowSearch(true)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-[#7dd3fc]/10 transition-colors"
            title="Search"
          >
            <span className="material-symbols-outlined cursor-pointer hover:text-white transition-colors">search</span>
          </button>
        )}

        {/* Notifications Icon Button & Popover */}
        <div className="relative">
          <button 
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-[#7dd3fc]/10 transition-colors relative flex items-center"
            title="Notifications"
          >
            <span className="material-symbols-outlined cursor-pointer hover:text-white transition-colors">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-[#0f1524]/95 border border-[#7dd3fc]/30 rounded-xl shadow-2xl backdrop-blur-[24px] p-4 flex flex-col gap-3 z-50">
              <div className="flex justify-between items-center pb-2 border-b border-[#7dd3fc]/20">
                <span className="font-headline text-xs font-bold text-white uppercase tracking-wider">System Alerts</span>
                {unreadCount > 0 && (
                  <button 
                    type="button"
                    onClick={markAllRead} 
                    className="text-[10px] font-mono text-[#7dd3fc] hover:underline font-bold"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {notifications.map((item) => (
                  <div 
                    key={item.id}
                    className={`p-2.5 rounded-lg flex items-start gap-3 transition-colors ${
                      item.unread ? 'bg-[#7dd3fc]/10 border border-[#7dd3fc]/30' : 'bg-white/5 opacity-70'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[#7dd3fc] text-[18px] mt-0.5">{item.icon}</span>
                    <div className="flex flex-col gap-0.5 flex-1">
                      <span className="font-headline text-xs text-white font-bold">{item.title}</span>
                      <p className="font-body text-[11px] text-white/70 leading-tight">{item.desc}</p>
                      <span className="font-mono text-[9px] text-[#7dd3fc] mt-1">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-4 w-[1px] bg-[#7dd3fc]/30 mx-1"></div>

        {/* Interactive Account Profile Dropdown */}
        <AccountProfileDropdown 
          userName="Admin User" 
          userRole="SYSTEM CONTROLLER" 
          userEmail="admin@atlasbuild.com" 
          organization="AtlasBuild Enterprise"
        />

      </div>

    </header>
  );
}
