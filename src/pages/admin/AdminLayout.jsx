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
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminLayout() {
  const { user, logout } = useCMS();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentUser = user || {
    name: 'Mr. Farook Kalumbi',
    title: 'Chief Operating Officer',
    role: 'System Administrator',
    avatar: '/farook_avatar.jpg'
  };

  const roleCode = currentUser.roleCode || 'SYSTEM_ADMIN';

  const roleAllowedPaths = {
    SYSTEM_ADMIN: ['/admin/dashboard', '/admin/posts', '/admin/vacancies', '/admin/leads', '/admin/roles', '/admin/partners', '/admin/analytics', '/admin/settings'],
    CONTENT_ADMIN: ['/admin/dashboard', '/admin/posts', '/admin/analytics'],
    CONTENT_AUTHOR: ['/admin/dashboard', '/admin/posts'],
    SERVICE_MANAGER: ['/admin/dashboard', '/admin/posts'],
    HR_MANAGER: ['/admin/dashboard', '/admin/vacancies'],
    CLIENT_SUPPORT: ['/admin/dashboard', '/admin/leads'],
    SALES_MANAGER: ['/admin/dashboard', '/admin/leads'],
    SECURITY_AUDITOR: ['/admin/dashboard', '/admin/roles', '/admin/settings'],
    PARTNER_MANAGER: ['/admin/dashboard', '/admin/partners'],
    ANALYTICS_VIEWER: ['/admin/dashboard', '/admin/analytics']
  };

  const allowedPaths = roleAllowedPaths[roleCode] || roleAllowedPaths.SYSTEM_ADMIN;

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Content Management', path: '/admin/posts', icon: FileText },
    { label: 'Vacancies', path: '/admin/vacancies', icon: Briefcase },
    { label: 'Leads & Quotes', path: '/admin/leads', icon: MessageSquare },
    { label: 'Users & Roles', path: '/admin/roles', icon: Users },
    { label: 'Partners', path: '/admin/partners', icon: Handshake },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ].filter(item => allowedPaths.includes(item.path));

  const handleSignOut = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. TOP HEADER (Deep Navy #23275c with Senga Systems Brand & White Text) */}
      <header className="sticky top-0 z-40 bg-[#23275c] text-white border-b-2 border-[#2b66bf] px-4 md:px-8 py-3.5 flex items-center justify-between shadow-lg">
        
        {/* Brand & Logo Lockup + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/10 text-white md:hidden hover:bg-white/20"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin/dashboard" className="flex items-center gap-3 group">
            <img 
              src="/assets/logo/senga-logo-white.png" 
              alt="SENGA SYSTEMS™ Logo" 
              className="h-10 sm:h-11 object-contain shrink-0 transition-transform group-hover:scale-105"
              onError={(e) => {
                e.target.src = '/assets/logo/senga-logo.png';
              }}
            />
            <div className="hidden sm:block leading-tight">
              <span className="font-extrabold text-base text-white tracking-wide block">SENGA SYSTEMS</span>
              <span className="text-[10px] font-bold tracking-wider text-blue-300 block">Building Intelligent Digital Solutions</span>
            </div>
          </Link>
        </div>

        {/* Right User Profile Controls & Notifications */}
        <div className="flex items-center gap-4">
          
          {/* View Public Site Shortcut */}
          <Link
            to="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 text-xs font-semibold border border-white/20 transition-colors"
          >
            <span>View Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
          </Link>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors relative cursor-pointer"
            >
              <Bell className="w-5 h-5 text-blue-200" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-blue-400 ring-2 ring-[#23275c] animate-pulse"></span>
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 text-slate-900 rounded-2xl p-4 shadow-2xl space-y-3 z-50 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900">Notifications</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">2 New</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <p className="font-semibold text-slate-800">New Quote Request received</p>
                    <span className="text-[10px] text-slate-500">Malawi Microfinance • 10 mins ago</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <p className="font-semibold text-slate-800">System Security Backup Completed</p>
                    <span className="text-[10px] text-slate-500">System Telemetry • 2 hours ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <img
                src={currentUser.avatar || '/farook_avatar.jpg'}
                alt={currentUser.name}
                className="w-9 h-9 rounded-xl object-cover border-2 border-blue-400"
              />
              <div className="hidden md:block text-left leading-tight">
                <span className="font-extrabold text-xs text-white block">{currentUser.name}</span>
                <span className="text-[10px] text-blue-300 font-semibold block">{currentUser.title || 'Chief Operating Officer'}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-blue-200 hidden md:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-slate-200 text-slate-900 rounded-2xl p-2 shadow-2xl space-y-1 z-50 text-xs">
                <div className="p-3 border-b border-slate-100">
                  <p className="font-bold text-slate-900 text-sm">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold text-[10px]">
                    {currentUser.role || 'System Administrator'}
                  </span>
                </div>
                <Link to="/admin/settings" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-semibold">
                  <User className="w-4 h-4 text-[#2563EB]" />
                  <span>Profile & Settings</span>
                </Link>
                <Link to="/admin/settings" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-semibold">
                  <HelpCircle className="w-4 h-4 text-[#2563EB]" />
                  <span>Help & Documentation</span>
                </Link>
                <div className="my-1 border-t border-slate-100"></div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 font-bold transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* MAIN BODY: COLLAPSIBLE SIDEBAR + CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* COLLAPSIBLE SIDEBAR NAVIGATION (Desktop) */}
        <aside 
          className={`bg-white border-r border-slate-200 p-4 hidden md:flex flex-col justify-between shrink-0 shadow-xs transition-all duration-300 ${
            isSidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          <div className="space-y-6">
            
            {/* Sidebar Header: Section Title + Minimize/Expand Toggle */}
            <div className={`flex items-center justify-between pb-2 border-b border-slate-200 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
              {!isSidebarCollapsed && (
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Navigation Menu</span>
              )}

              {/* Minimise / Expand Toggle Button */}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-300 shrink-0 shadow-xs"
                title={isSidebarCollapsed ? "Expand Sidebar" : "Minimize Sidebar"}
              >
                {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
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
                    title={isSidebarCollapsed ? item.label : undefined}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all ${
                      isSidebarCollapsed ? 'justify-center px-2' : ''
                    } ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
                        : 'text-slate-700 hover:text-[#2563EB] hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Sign Out */}
          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={handleSignOut}
              title={isSidebarCollapsed ? "Sign Out" : undefined}
              className={`w-full py-2.5 rounded-xl bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-600 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-200 ${
                isSidebarCollapsed ? 'px-0' : ''
              }`}
            >
              <LogOut className="w-4 h-4 text-red-500" />
              {!isSidebarCollapsed && <span>Sign Out</span>}
            </button>
          </div>
        </aside>

        {/* MOBILE SIDEBAR DRAWER */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs md:hidden flex">
            <div className="w-64 bg-white h-full p-4 flex flex-col justify-between space-y-6 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-extrabold text-sm text-slate-900">Navigation Menu</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg text-slate-500 hover:bg-slate-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold ${
                          isActive ? 'bg-[#2563EB] text-white' : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <button
                onClick={handleSignOut}
                className="w-full py-2.5 rounded-xl bg-red-50 text-red-600 text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* MAIN PAGE CONTENT WRAPPER */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 px-4 md:px-8 py-3 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>© 2026 Senga Systems Limited. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-700">Admin Portal v2.4.0</span>
          <span>•</span>
          <a href="mailto:help@sengasystems.com" className="text-[#2563EB] font-semibold hover:underline">
            Support Email: help@sengasystems.com
          </a>
        </div>
      </footer>

    </div>
  );
}
