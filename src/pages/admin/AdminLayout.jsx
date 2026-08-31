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
  ChevronRight,
  ChevronLeft,
  User,
  HelpCircle,
  Menu,
  X,
  Globe,
  Newspaper,
  Lightbulb,
  Megaphone,
  Home,
  LayoutGrid
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminLayout() {
  const { user, logout, activities } = useCMS();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contentSubmenuOpen, setContentSubmenuOpen] = useState(true);

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

  const handleSignOut = () => {
    logout();
    navigate('/admin/login');
  };

  // Generate Breadcrumbs array based on current pathname
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const crumbs = [{ label: 'Admin', path: '/admin/dashboard' }];

    if (path.includes('/admin/dashboard')) {
      crumbs.push({ label: 'Dashboard', path: '/admin/dashboard' });
    } else if (path.includes('/admin/posts')) {
      crumbs.push({ label: 'Content Management', path: '/admin/posts' });
      const search = location.search;
      if (search.includes('type=news')) {
        crumbs.push({ label: 'News & Press', path: '/admin/posts?type=news' });
      } else if (search.includes('type=insights')) {
        crumbs.push({ label: 'Insights & AI Trends', path: '/admin/posts?type=insights' });
      } else if (search.includes('type=announcements')) {
        crumbs.push({ label: 'Announcements', path: '/admin/posts?type=announcements' });
      } else {
        crumbs.push({ label: 'All Posts', path: '/admin/posts' });
      }
    } else if (path.includes('/admin/vacancies')) {
      crumbs.push({ label: 'Careers & Vacancies', path: '/admin/vacancies' });
    } else if (path.includes('/admin/leads')) {
      crumbs.push({ label: 'Leads & Quotes', path: '/admin/leads' });
    } else if (path.includes('/admin/roles')) {
      crumbs.push({ label: 'Users & Roles', path: '/admin/roles' });
    } else if (path.includes('/admin/partners')) {
      crumbs.push({ label: 'Partners', path: '/admin/partners' });
    } else if (path.includes('/admin/analytics')) {
      crumbs.push({ label: 'Analytics', path: '/admin/analytics' });
    } else if (path.includes('/admin/settings')) {
      crumbs.push({ label: 'System Settings', path: '/admin/settings' });
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  const isContentActive = location.pathname.startsWith('/admin/posts');

  return (
    <div className="h-screen overflow-hidden bg-slate-100/80 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. TOP HEADER WITH 2PX BORDER LINE (Deep Navy #23275c with Senga Systems Brand & White Text) */}
      <header className="shrink-0 z-40 bg-[#23275c] text-white border-b-2 border-[#2b66bf] px-4 md:px-8 py-3.5 flex items-center justify-between shadow-lg h-[73px]">
        
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
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-100 border border-emerald-300/40 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
            <span>System Operational</span>
          </div>
          
          {/* View Public Site Shortcut */}
          <Link
            to="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 text-xs font-semibold border-2 border-white/20 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-blue-300" />
            <span>View Site</span>
            <ExternalLink className="w-3 h-3 text-blue-300 ml-0.5" />
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
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border-2 border-slate-300 text-slate-900 rounded-2xl p-4 shadow-2xl space-y-3 z-50 text-xs">
                <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2">
                  <span className="font-bold text-slate-900">System Notifications</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{activities?.length || 0} Total</span>
                </div>
                <div className="space-y-2">
                  {activities?.length ? activities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="p-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 space-y-1">
                      <p className="font-semibold text-slate-800">{activity.action}</p>
                      <span className="text-[10px] text-slate-500">{activity.userName || activity.user || 'System'} • {activity.timeAgo || 'Recently'}</span>
                    </div>
                  )) : (
                    <p className="py-4 text-center text-slate-500">No notifications yet.</p>
                  )}
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
              <div className="absolute right-0 top-full mt-2 w-60 bg-white border-2 border-slate-300 text-slate-900 rounded-2xl p-2 shadow-2xl space-y-1 z-50 text-xs">
                <div className="p-3 border-b-2 border-slate-200">
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
                <div className="my-1 border-t-2 border-slate-200"></div>
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

      {/* MAIN BODY: 100% FIXED SIDEBAR WITH #828080 GRAY ICONS + SCROLLABLE RIGHT CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* FIXED INTACT SIDEBAR (NEVER SCROLLS, 2PX RIGHT BORDER LINE) */}
        <aside 
          className={`bg-white border-r-2 border-slate-300 p-4 hidden md:flex flex-col justify-between shrink-0 h-full overflow-hidden transition-all duration-300 ${
            isSidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          <div className="space-y-6">
            
            {/* Sidebar Header: Navigation Symbol Icon with #828080 stroke + Collapse Toggle */}
            <div className={`flex items-center justify-between pb-3 border-b-2 border-slate-300 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
              {!isSidebarCollapsed && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 border-2 border-slate-300 flex items-center justify-center text-[#828080]">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* Minimise / Expand Toggle Button */}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#828080] transition-colors cursor-pointer border-2 border-slate-300 shrink-0 shadow-xs"
                title={isSidebarCollapsed ? "Expand Sidebar" : "Minimize Sidebar"}
              >
                {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            {/* Navigation Links with #828080 Inactive Icon Colors */}
            <nav className="space-y-1">
              
              {/* 1. Dashboard */}
              {allowedPaths.includes('/admin/dashboard') && (
                <Link
                  to="/admin/dashboard"
                  title={isSidebarCollapsed ? "Dashboard" : undefined}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all border-2 ${
                    isSidebarCollapsed ? 'justify-center px-2' : ''
                  } ${
                    location.pathname === '/admin/dashboard'
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/20'
                      : 'text-slate-700 border-transparent hover:text-[#2563EB] hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className={`w-4 h-4 shrink-0 ${location.pathname === '/admin/dashboard' ? 'text-white' : 'text-[#828080]'}`} />
                  {!isSidebarCollapsed && <span>Dashboard</span>}
                </Link>
              )}

              {/* 2. Content Management */}
              {allowedPaths.includes('/admin/posts') && (
                <div>
                  <Link
                    to="/admin/posts"
                    onClick={() => setContentSubmenuOpen(!contentSubmenuOpen)}
                    title={isSidebarCollapsed ? "Content" : undefined}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-extrabold cursor-pointer transition-all border-2 ${
                      isSidebarCollapsed ? 'justify-center px-2' : ''
                    } ${
                      isContentActive
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/20 font-black'
                        : 'text-slate-700 border-transparent hover:text-[#2563EB] hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className={`w-4 h-4 shrink-0 ${isContentActive ? 'text-white' : 'text-[#828080]'}`} />
                      {!isSidebarCollapsed && <span>Content</span>}
                    </div>
                    {!isSidebarCollapsed && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${contentSubmenuOpen ? 'rotate-180' : ''} ${isContentActive ? 'text-white' : 'text-[#828080]'}`} />
                    )}
                  </Link>

                  {/* Sub-menu Tree Items */}
                  {contentSubmenuOpen && !isSidebarCollapsed && (
                    <div className="pl-4 mt-1.5 space-y-1 border-l-2 border-slate-300 ml-5">
                      <Link
                        to="/admin/posts"
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors border-2 ${
                          location.pathname === '/admin/posts' && !location.search
                            ? 'text-[#2563EB] font-black bg-blue-50/80 border-blue-300'
                            : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <FileText className={`w-3.5 h-3.5 shrink-0 ${location.pathname === '/admin/posts' && !location.search ? 'text-[#2563EB]' : 'text-[#828080]'}`} />
                        <span>All Posts</span>
                      </Link>
                      <Link
                        to="/admin/posts?type=news"
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors border-2 ${
                          location.search.includes('type=news')
                            ? 'text-[#2563EB] font-black bg-blue-50/80 border-blue-300'
                            : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <Newspaper className={`w-3.5 h-3.5 shrink-0 ${location.search.includes('type=news') ? 'text-[#2563EB]' : 'text-[#828080]'}`} />
                        <span>News & Press</span>
                      </Link>
                      <Link
                        to="/admin/posts?type=insights"
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors border-2 ${
                          location.search.includes('type=insights')
                            ? 'text-[#2563EB] font-black bg-blue-50/80 border-blue-300'
                            : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <Lightbulb className={`w-3.5 h-3.5 shrink-0 ${location.search.includes('type=insights') ? 'text-[#2563EB]' : 'text-[#828080]'}`} />
                        <span>Insights</span>
                      </Link>
                      <Link
                        to="/admin/posts?type=announcements"
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors border-2 ${
                          location.search.includes('type=announcements')
                            ? 'text-[#2563EB] font-black bg-blue-50/80 border-blue-300'
                            : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <Megaphone className={`w-3.5 h-3.5 shrink-0 ${location.search.includes('type=announcements') ? 'text-[#2563EB]' : 'text-[#828080]'}`} />
                        <span>Announcements</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* 3. Vacancies */}
              {allowedPaths.includes('/admin/vacancies') && (
                <Link
                  to="/admin/vacancies"
                  title={isSidebarCollapsed ? "Vacancies" : undefined}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all border-2 ${
                    isSidebarCollapsed ? 'justify-center px-2' : ''
                  } ${
                    location.pathname.startsWith('/admin/vacancies')
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/20'
                      : 'text-slate-700 border-transparent hover:text-[#2563EB] hover:bg-slate-100'
                  }`}
                >
                  <Briefcase className={`w-4 h-4 shrink-0 ${location.pathname.startsWith('/admin/vacancies') ? 'text-white' : 'text-[#828080]'}`} />
                  {!isSidebarCollapsed && <span>Vacancies</span>}
                </Link>
              )}

              {/* 4. Leads & Quotes */}
              {allowedPaths.includes('/admin/leads') && (
                <Link
                  to="/admin/leads"
                  title={isSidebarCollapsed ? "Leads & Quotes" : undefined}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all border-2 ${
                    isSidebarCollapsed ? 'justify-center px-2' : ''
                  } ${
                    location.pathname.startsWith('/admin/leads')
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/20'
                      : 'text-slate-700 border-transparent hover:text-[#2563EB] hover:bg-slate-100'
                  }`}
                >
                  <MessageSquare className={`w-4 h-4 shrink-0 ${location.pathname.startsWith('/admin/leads') ? 'text-white' : 'text-[#828080]'}`} />
                  {!isSidebarCollapsed && <span>Leads & Quotes</span>}
                </Link>
              )}

              {/* 5. Users & Roles */}
              {allowedPaths.includes('/admin/roles') && (
                <Link
                  to="/admin/roles"
                  title={isSidebarCollapsed ? "Users & Roles" : undefined}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all border-2 ${
                    isSidebarCollapsed ? 'justify-center px-2' : ''
                  } ${
                    location.pathname.startsWith('/admin/roles')
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/20'
                      : 'text-slate-700 border-transparent hover:text-[#2563EB] hover:bg-slate-100'
                  }`}
                >
                  <Users className={`w-4 h-4 shrink-0 ${location.pathname.startsWith('/admin/roles') ? 'text-white' : 'text-[#828080]'}`} />
                  {!isSidebarCollapsed && <span>Users & Roles</span>}
                </Link>
              )}

              {/* 6. Partners */}
              {allowedPaths.includes('/admin/partners') && (
                <Link
                  to="/admin/partners"
                  title={isSidebarCollapsed ? "Partners" : undefined}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all border-2 ${
                    isSidebarCollapsed ? 'justify-center px-2' : ''
                  } ${
                    location.pathname.startsWith('/admin/partners')
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/20'
                      : 'text-slate-700 border-transparent hover:text-[#2563EB] hover:bg-slate-100'
                  }`}
                >
                  <Handshake className={`w-4 h-4 shrink-0 ${location.pathname.startsWith('/admin/partners') ? 'text-white' : 'text-[#828080]'}`} />
                  {!isSidebarCollapsed && <span>Partners</span>}
                </Link>
              )}

              {/* 7. Analytics */}
              {allowedPaths.includes('/admin/analytics') && (
                <Link
                  to="/admin/analytics"
                  title={isSidebarCollapsed ? "Analytics" : undefined}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all border-2 ${
                    isSidebarCollapsed ? 'justify-center px-2' : ''
                  } ${
                    location.pathname.startsWith('/admin/analytics')
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/20'
                      : 'text-slate-700 border-transparent hover:text-[#2563EB] hover:bg-slate-100'
                  }`}
                >
                  <BarChart3 className={`w-4 h-4 shrink-0 ${location.pathname.startsWith('/admin/analytics') ? 'text-white' : 'text-[#828080]'}`} />
                  {!isSidebarCollapsed && <span>Analytics</span>}
                </Link>
              )}

              {/* 8. Settings */}
              {allowedPaths.includes('/admin/settings') && (
                <Link
                  to="/admin/settings"
                  title={isSidebarCollapsed ? "Settings" : undefined}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all border-2 ${
                    isSidebarCollapsed ? 'justify-center px-2' : ''
                  } ${
                    location.pathname.startsWith('/admin/settings')
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/20'
                      : 'text-slate-700 border-transparent hover:text-[#2563EB] hover:bg-slate-100'
                  }`}
                >
                  <Settings className={`w-4 h-4 shrink-0 ${location.pathname.startsWith('/admin/settings') ? 'text-white' : 'text-[#828080]'}`} />
                  {!isSidebarCollapsed && <span>Settings</span>}
                </Link>
              )}

            </nav>
          </div>

          {/* Bottom Sidebar Action Buttons */}
          <div className="pt-4 border-t-2 border-slate-300 space-y-2">
            <Link
              to="/"
              target="_blank"
              title={isSidebarCollapsed ? "View Site" : undefined}
              className={`w-full py-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-[#2563EB] text-xs font-bold flex items-center justify-center gap-2 transition-all border-2 border-slate-300 ${
                isSidebarCollapsed ? 'px-0' : ''
              }`}
            >
              <Globe className="w-4 h-4 text-[#828080]" />
              {!isSidebarCollapsed && <span>View Site</span>}
            </Link>

            <button
              onClick={handleSignOut}
              title={isSidebarCollapsed ? "Sign Out" : undefined}
              className={`w-full py-2.5 rounded-xl bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-600 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border-2 border-slate-300 ${
                isSidebarCollapsed ? 'px-0' : ''
              }`}
            >
              <LogOut className="w-4 h-4 text-red-500" />
              {!isSidebarCollapsed && <span>Sign Out</span>}
            </button>
          </div>
        </aside>

        {/* MAIN SCROLLABLE CONTENT WRAPPER */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 h-full">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* BREADCRUMB NAVIGATION */}
            <nav className="flex items-center gap-2 text-xs font-extrabold text-slate-500 bg-white border-2 border-slate-300 rounded-2xl px-4 py-2.5 shadow-xs">
              <Home className="w-3.5 h-3.5 text-[#2563EB]" />
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.path + idx}>
                  <span>/</span>
                  <Link
                    to={crumb.path}
                    className={`hover:text-[#2563EB] transition-colors ${
                      idx === breadcrumbs.length - 1 ? 'text-slate-900 font-black' : 'text-slate-600'
                    }`}
                  >
                    {crumb.label}
                  </Link>
                </React.Fragment>
              ))}
            </nav>

            <div key={`${location.pathname}${location.search}`} className="page-transition">
              <Outlet />
            </div>
          </div>
        </main>

      </div>

      {/* FOOTER */}
      <footer className="shrink-0 bg-white border-t-2 border-slate-300 px-4 md:px-8 py-3 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 z-10">
        <div>© 2026 Senga Systems Limited. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-700">Admin Portal v2.5.0</span>
          <span>•</span>
          <a href="mailto:help@sengasystems.com" className="text-[#2563EB] font-semibold hover:underline">
            Support Email: help@sengasystems.com
          </a>
        </div>
      </footer>

    </div>
  );
}
