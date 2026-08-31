import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Users, 
  Handshake, 
  BarChart3, 
  Settings, 
  Bell, 
  LogOut, 
  ExternalLink, 
  ShieldCheck, 
  ChevronDown,
  User,
  HelpCircle
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminLayout() {
  const { user, logout } = useCMS();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const currentUser = user || {
    name: 'Farook Kalumbi',
    title: 'Chief Operating Officer',
    role: 'System Administrator',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Content Management', path: '/admin/posts', icon: FileText },
    { label: 'Vacancies', path: '/admin/vacancies', icon: Briefcase },
    { label: 'Leads & Quotes', path: '/admin/leads', icon: MessageSquare },
    { label: 'Users & Roles', path: '/admin/roles', icon: Users },
    { label: 'Partners', path: '/admin/partners', icon: Handshake },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleSignOut = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. TOP HEADER */}
      <header className="sticky top-0 z-40 bg-[#0B1120] border-b border-slate-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-md">
        
        {/* Brand & Admin Panel Badge */}
        <div className="flex items-center gap-3">
          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight block">SENGA SYSTEMS</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block -mt-1">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Right User Profile Controls & Notifications */}
        <div className="flex items-center gap-4">
          
          {/* View Public Site Shortcut */}
          <Link
            to="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <span>View Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors relative cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-[#0B1120] animate-pulse"></span>
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-[#0F172A] border border-slate-700 rounded-2xl p-4 shadow-2xl space-y-3 z-50 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-white">Notifications</span>
                  <span className="text-[10px] bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded-full font-bold">2 New</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-slate-800/60 space-y-1">
                    <p className="font-semibold text-slate-200">New Quote Request received</p>
                    <span className="text-[10px] text-slate-400">Malawi Microfinance • 10 mins ago</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/60 space-y-1">
                    <p className="font-semibold text-slate-200">System Security Backup Completed</p>
                    <span className="text-[10px] text-slate-400">System Telemetry • 2 hours ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-800/70 transition-colors cursor-pointer"
            >
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={currentUser.name}
                className="w-9 h-9 rounded-xl object-cover border border-blue-500/40"
              />
              <div className="hidden md:block text-left leading-tight">
                <span className="font-extrabold text-xs text-white block">{currentUser.name}</span>
                <span className="text-[10px] text-blue-400 font-semibold block">{currentUser.title || 'Chief Operating Officer'}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#0F172A] border border-slate-700 rounded-2xl p-2 shadow-2xl space-y-1 z-50 text-xs">
                <div className="p-3 border-b border-slate-800">
                  <p className="font-bold text-white text-sm">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-400">{currentUser.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-extrabold text-[10px]">
                    {currentUser.role || 'System Administrator'}
                  </span>
                </div>
                <Link to="/admin/settings" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white font-medium">
                  <User className="w-4 h-4 text-blue-400" />
                  <span>Profile & Settings</span>
                </Link>
                <Link to="/admin/settings" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white font-medium">
                  <HelpCircle className="w-4 h-4 text-blue-400" />
                  <span>Help & Documentation</span>
                </Link>
                <div className="my-1 border-t border-slate-800"></div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 font-bold transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* MAIN BODY: SIDEBAR + CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 bg-[#0B1120] border-r border-slate-800/80 p-4 hidden md:flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            
            {/* User Profile Card inside Sidebar */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={currentUser.name}
                className="w-10 h-10 rounded-xl object-cover border border-blue-500/40 shrink-0"
              />
              <div className="overflow-hidden">
                <span className="font-extrabold text-xs text-white truncate block">{currentUser.name}</span>
                <span className="text-[10px] font-extrabold text-blue-400 bg-blue-500/15 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  {currentUser.title || 'Chief Operating Officer'}
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Action */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={handleSignOut}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* MAIN PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
          <Outlet />
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0B1120] border-t border-slate-800/80 px-6 py-4 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© 2025 Senga Systems Limited • Admin version 2.4.0</span>
        <span>Support Email: <a href="mailto:help@sengasystems.com" className="text-blue-400 hover:underline">help@sengasystems.com</a></span>
      </footer>

    </div>
  );
}
