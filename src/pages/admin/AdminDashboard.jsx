import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Calendar, 
  Users, 
  Handshake, 
  TrendingUp, 
  Plus, 
  ShieldCheck, 
  Clock, 
  Activity, 
  BarChart3, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Database
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminDashboard() {
  const { user, posts, vacancies, quotes, consultations, users, partners, activities, stats } = useCMS();
  const navigate = useNavigate();

  // Time-based Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const currentUser = user || {
    name: 'Mr. Farook Kalumbi',
    title: 'Chief Operating Officer',
    role: 'System Administrator'
  };

  // 6 Stats Cards Data in Light Mode Palette
  const statsCards = [
    {
      title: 'Published Posts',
      subtitle: 'News, Insights & Announcements',
      count: posts.length || 12,
      trend: '↑ 12% vs last month',
      icon: FileText,
      color: 'text-[#2563EB]',
      bgColor: 'bg-blue-50 border-blue-200',
      path: '/admin/posts'
    },
    {
      title: 'Active Vacancies',
      subtitle: 'Open career opportunities',
      count: vacancies.length || 2,
      trend: '↑ 25% vs last month',
      icon: Briefcase,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 border-pink-200',
      path: '/admin/vacancies'
    },
    {
      title: 'Quote Requests',
      subtitle: 'Client project submissions',
      count: quotes.length || 18,
      trend: '↑ 18% vs last month',
      icon: MessageSquare,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 border-amber-200',
      path: '/admin/leads'
    },
    {
      title: 'Booked Sessions',
      subtitle: 'Technical consultations',
      count: consultations.length || 8,
      trend: '↑ 8% vs last month',
      icon: Calendar,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200',
      path: '/admin/leads'
    },
    {
      title: 'Total Users',
      subtitle: 'Registered system users',
      count: users.length || 4,
      trend: '↑ 10% vs last month',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      path: '/admin/roles'
    },
    {
      title: 'Active Partners',
      subtitle: 'Partner organizations',
      count: partners.length || 6,
      trend: '↑ 15% vs last month',
      icon: Handshake,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50 border-cyan-200',
      path: '/admin/partners'
    }
  ];

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. WELCOME SECTION (Clean White Light Mode Card) */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-md space-y-4 text-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider font-extrabold text-[#2563EB]">Welcome Back</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-extrabold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>System: Active & Synced</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {getGreeting()}, {currentUser.name} 👋
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium pt-1">
              <span>Role: <strong className="text-slate-900">{currentUser.title || 'Chief Operating Officer'}</strong></span>
              <span>•</span>
              <span>Privileges: <strong className="text-[#2563EB]">{currentUser.role || 'System Administrator'}</strong></span>
              <span>•</span>
              <span>Last Login: <strong className="text-slate-700">Today at 08:30 AM</strong></span>
            </div>
          </div>

          {/* Quick Action Primary Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/posts"
              className="px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Post</span>
            </Link>
            <Link
              to="/admin/vacancies"
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs border border-slate-300 flex items-center gap-2 transition-all"
            >
              <Briefcase className="w-4 h-4 text-[#2563EB]" />
              <span>Post Vacancy</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. QUICK ACTIONS BAR */}
      <section className="space-y-3">
        <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Quick Actions Bar</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <Link to="/admin/posts" className="p-3.5 rounded-2xl bg-white hover:bg-blue-50 border border-slate-200 text-xs font-extrabold text-slate-800 shadow-xs flex items-center gap-2.5 transition-all">
            <FileText className="w-4 h-4 text-[#2563EB]" />
            <span>📝 New Post</span>
          </Link>
          <Link to="/admin/vacancies" className="p-3.5 rounded-2xl bg-white hover:bg-pink-50 border border-slate-200 text-xs font-extrabold text-slate-800 shadow-xs flex items-center gap-2.5 transition-all">
            <Briefcase className="w-4 h-4 text-pink-600" />
            <span>💼 Add Vacancy</span>
          </Link>
          <Link to="/admin/leads" className="p-3.5 rounded-2xl bg-white hover:bg-amber-50 border border-slate-200 text-xs font-extrabold text-slate-800 shadow-xs flex items-center gap-2.5 transition-all">
            <MessageSquare className="w-4 h-4 text-amber-600" />
            <span>📩 View Quotes</span>
          </Link>
          <Link to="/admin/roles" className="p-3.5 rounded-2xl bg-white hover:bg-purple-50 border border-slate-200 text-xs font-extrabold text-slate-800 shadow-xs flex items-center gap-2.5 transition-all">
            <Users className="w-4 h-4 text-purple-600" />
            <span>👥 Add User</span>
          </Link>
          <Link to="/admin/analytics" className="p-3.5 rounded-2xl bg-white hover:bg-cyan-50 border border-slate-200 text-xs font-extrabold text-slate-800 shadow-xs flex items-center gap-2.5 transition-all">
            <BarChart3 className="w-4 h-4 text-cyan-600" />
            <span>📊 Analytics</span>
          </Link>
        </div>
      </section>

      {/* 3. 6 STATS CARDS (Light Mode) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statsCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.path}
              className="bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-6 shadow-md flex flex-col justify-between group transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">{card.title}</span>
                  <span className="text-3xl font-black text-slate-900 mt-1 block">{card.count}</span>
                </div>
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${card.bgColor} ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium line-clamp-1">{card.subtitle}</span>
                <span className="text-emerald-700 font-extrabold shrink-0 ml-2">{card.trend}</span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* 4. RECENT ACTIVITY FEED & SYSTEM STATUS (Light Mode) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 cols: Recent Activity Feed */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#2563EB]" />
              <span>Recent Activity Feed</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">Last 10 System Actions</span>
          </div>

          <div className="space-y-4">
            {activities && activities.length > 0 ? (
              activities.map((act) => (
                <div key={act.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center text-[#2563EB] font-bold shrink-0">
                    {act.avatar ? (
                      <img src={act.avatar} alt={act.user} className="w-full h-full rounded-xl object-cover" />
                    ) : (
                      act.user.charAt(0)
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-xs font-bold text-slate-900 leading-snug">{act.action}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-semibold text-[#2563EB]">{act.user}</span>
                      <span>•</span>
                      <span>{act.timeAgo}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-500 text-xs font-medium">
                No recent activity recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Right 5 cols: System Health & Status */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>System Health Status</span>
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            
            {/* Operational Indicator */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-extrabold text-emerald-900 block text-sm">All Systems Operational</span>
                  <span className="text-emerald-700 text-[11px]">Database, API & Cloud Clusters Online</span>
                </div>
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            {/* Security Check */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-[#2563EB] shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">Security Check Status</span>
                  <span className="text-slate-500 text-[11px]">Passed • Last Scan: Today 06:00 AM</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 font-extrabold text-[10px]">PASSED</span>
            </div>

            {/* Database Backup */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-purple-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">Automated Database Backup</span>
                  <span className="text-slate-500 text-[11px]">Completed Today at 02:00 AM</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 font-extrabold text-[10px]">SYNCED</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
