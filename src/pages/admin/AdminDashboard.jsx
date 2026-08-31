import React, { useState, useEffect } from 'react';
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
  Search,
  Server,
  Zap,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Command,
  Sun,
  Moon,
  CloudSun,
  Eye,
  Check,
  Flame,
  Target,
  Settings
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminDashboard() {
  const { user, posts, vacancies, quotes, consultations, users, partners, activities, stats } = useCMS();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic Time-Based Greeting with Emojis
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return { text: 'Good Morning', emoji: '☀️' };
    if (hour >= 12 && hour < 17) return { text: 'Good Afternoon', emoji: '🌤️' };
    if (hour >= 17 && hour < 22) return { text: 'Good Evening', emoji: '🌙' };
    return { text: 'Good Night', emoji: '🌌' };
  };

  const greeting = getGreeting();

  const currentUser = user || {
    name: 'Mr. Farook Kalumbi',
    title: 'Chief Operating Officer',
    role: 'System Administrator'
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        navigate('/admin/posts');
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        navigate('/admin/vacancies');
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'q') {
        e.preventDefault();
        navigate('/admin/leads');
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        navigate('/admin/roles');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Metric Cards with Homepage-Style Professional Vector Icon Badges
  const statsCards = [
    {
      title: 'PUBLISHED POSTS',
      count: posts.length || 12,
      subtitle: 'News, Insights & Announcements',
      trend: '↑ 12% vs last month',
      icon: FileText,
      color: 'text-[#2563EB]',
      bgColor: 'bg-blue-50 border-blue-200',
      iconContainer: 'bg-blue-100 text-[#2563EB] border border-blue-300',
      sparklineColor: '#2563EB',
      sparklinePath: 'M0,25 Q15,10 30,22 T60,8 T90,18 T120,5',
      path: '/admin/posts'
    },
    {
      title: 'ACTIVE VACANCIES',
      count: vacancies.length || 2,
      subtitle: 'Open career opportunities',
      trend: '↑ 25% vs last week',
      icon: Briefcase,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 border-pink-200',
      iconContainer: 'bg-pink-100 text-pink-600 border border-pink-300',
      sparklineColor: '#db2777',
      sparklinePath: 'M0,20 Q15,25 30,12 T60,18 T90,8 T120,4',
      path: '/admin/vacancies'
    },
    {
      title: 'QUOTE REQUESTS',
      count: quotes.length || 18,
      subtitle: 'Client project submissions',
      trend: '↑ 18% vs last month',
      icon: MessageSquare,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 border-amber-200',
      iconContainer: 'bg-amber-100 text-amber-600 border border-amber-300',
      sparklineColor: '#d97706',
      sparklinePath: 'M0,22 Q15,15 30,20 T60,10 T90,14 T120,6',
      path: '/admin/leads'
    },
    {
      title: 'BOOKED SESSIONS',
      count: consultations.length || 8,
      subtitle: 'Technical consultations',
      trend: '↑ 8% vs last week',
      icon: Calendar,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200',
      iconContainer: 'bg-emerald-100 text-emerald-600 border border-emerald-300',
      sparklineColor: '#059669',
      sparklinePath: 'M0,24 Q15,18 30,22 T60,12 T90,10 T120,5',
      path: '/admin/leads'
    },
    {
      title: 'TOTAL USERS',
      count: users.length || 4,
      subtitle: 'Registered system users',
      trend: '↑ 10% vs last month',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      iconContainer: 'bg-purple-100 text-purple-600 border border-purple-300',
      sparklineColor: '#9333ea',
      sparklinePath: 'M0,20 Q15,12 30,18 T60,8 T90,15 T120,7',
      path: '/admin/roles'
    },
    {
      title: 'ACTIVE PARTNERS',
      count: partners.length || 6,
      subtitle: 'Partner organizations',
      trend: '↑ 15% vs last month',
      icon: Handshake,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50 border-cyan-200',
      iconContainer: 'bg-cyan-100 text-cyan-600 border border-cyan-300',
      sparklineColor: '#0891b2',
      sparklinePath: 'M0,26 Q15,20 30,14 T60,16 T90,6 T120,3',
      path: '/admin/partners'
    }
  ];

  // Quick Action Buttons with Homepage-Style Icon Badges & Shortcuts
  const quickActions = [
    { label: 'New Post', shortcut: '⌘N', path: '/admin/posts', icon: FileText, color: 'text-[#2563EB]', iconBg: 'bg-blue-100 text-[#2563EB] border-blue-300', hoverBg: 'hover:bg-blue-50 hover:border-blue-300', desc: 'Publish article or news' },
    { label: 'Add Vacancy', shortcut: '⌘V', path: '/admin/vacancies', icon: Briefcase, color: 'text-pink-600', iconBg: 'bg-pink-100 text-pink-600 border-pink-300', hoverBg: 'hover:bg-pink-50 hover:border-pink-300', desc: 'Post new job opening' },
    { label: 'View Quotes', shortcut: '⌘Q', path: '/admin/leads', icon: MessageSquare, color: 'text-amber-600', iconBg: 'bg-amber-100 text-amber-600 border-amber-300', hoverBg: 'hover:bg-amber-50 hover:border-amber-300', desc: 'Manage client inquiries' },
    { label: 'Add Staff', shortcut: '⌘U', path: '/admin/roles', icon: Users, color: 'text-purple-600', iconBg: 'bg-purple-100 text-purple-600 border-purple-300', hoverBg: 'hover:bg-purple-50 hover:border-purple-300', desc: 'Create employee account' },
    { label: 'Analytics', shortcut: '⌘A', path: '/admin/analytics', icon: BarChart3, color: 'text-cyan-600', iconBg: 'bg-cyan-100 text-cyan-600 border-cyan-300', hoverBg: 'hover:bg-cyan-50 hover:border-cyan-300', desc: 'View performance report' }
  ];

  // Upcoming Scheduled Events
  const upcomingEvents = [
    { id: 1, title: 'Malawi Executive Cybersecurity Summit 2026', date: 'Sep 25, 2026', location: 'BICC Lilongwe', seats: '45 Seats' },
    { id: 2, title: 'SengaShield Threat Intelligence Workshop', date: 'Oct 12, 2026', location: 'Virtual Webinar', seats: '120 Registered' }
  ];

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. GREETING BANNER & SEARCH CONTROL CENTER */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 text-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider font-black text-[#2563EB]">Control Center</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-black flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>System Status: Operational</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <span>{greeting.emoji}</span>
              <span>{greeting.text}, {currentUser.name}</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Oversee company operations, view real-time metrics, and manage system content.
            </p>
          </div>

          {/* Quick Action Primary Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/posts"
              className="px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Article</span>
            </Link>
            <Link
              to="/admin/vacancies"
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs border border-slate-300 flex items-center gap-2 transition-all"
            >
              <Briefcase className="w-4 h-4 text-[#2563EB]" />
              <span>Post Vacancy</span>
            </Link>
          </div>

        </div>

        {/* Global Control Center Search Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search posts, vacancies, quote inquiries, or staff members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-[#2563EB]"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-2.5 rounded-xl bg-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-300"
            >
              Clear Search
            </button>
          )}
        </div>
      </section>

      {/* 2. QUICK ACTION BAR WITH HOMEPAGE-STYLE ICON BADGES */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Quick Action Shortcuts</h3>
          <span className="text-[11px] text-slate-500 font-mono">Press ⌘ + Key</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                to={action.path}
                className={`p-4 rounded-2xl bg-white border border-slate-200 ${action.hoverBg} text-slate-900 shadow-xs flex flex-col justify-between space-y-3 transition-all group`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl ${action.iconBg} flex items-center justify-center shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-mono font-bold">
                    {action.shortcut}
                  </span>
                </div>

                <div>
                  <span className="text-sm font-black text-slate-900 block group-hover:text-[#2563EB] transition-colors">{action.label}</span>
                  <span className="text-[11px] text-slate-500 font-medium block">{action.desc}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. 6 STATS CARDS WITH HOMEPAGE-STYLE ICON BADGES & SPARKLINE GRAPHS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {statsCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-4 group transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">{card.title}</span>
                  <span className="text-3xl font-black text-slate-900 block">{card.count}</span>
                  <span className="text-xs font-bold text-slate-600 block">{card.subtitle}</span>
                </div>
                <div className={`w-12 h-12 rounded-2xl ${card.iconContainer} p-2.5 flex items-center justify-center shrink-0 shadow-xs`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              {/* Sparkline Chart & Growth Trend */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  {card.trend}
                </span>

                {/* SVG Sparkline Path */}
                <div className="w-24 h-8">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 120 30">
                    <path
                      d={card.sparklinePath}
                      fill="none"
                      stroke={card.sparklineColor}
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* View All Link at Bottom */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-bold">Updated real-time</span>
                <Link
                  to={card.path}
                  className="text-xs font-black text-[#2563EB] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      {/* 4. PERFORMANCE ANALYTICS SUMMARY CHARTS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Content Performance Chart */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#2563EB] border border-blue-200 flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black text-slate-900">📊 Content Performance</h3>
            </div>
            <span className="text-xs text-slate-500 font-bold font-mono">Posts vs Page Views</span>
          </div>

          <p className="text-xs text-slate-600 font-medium">Monthly publication output compared against public audience engagement.</p>

          {/* SVG Bar Chart Representation */}
          <div className="pt-4 space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>AI & Innovation Press</span>
                <span className="text-[#2563EB]">4,820 Views</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-[#2563EB] h-full w-[82%] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Cybersecurity Summit Announcements</span>
                <span className="text-emerald-600">3,450 Views</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[65%] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Enterprise Cloud Migration Insights</span>
                <span className="text-purple-600">2,910 Views</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[54%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Trends & Conversion */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black text-slate-900">📈 Quote Trends & Conversion</h3>
            </div>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              72% Conversion Rate
            </span>
          </div>

          <p className="text-xs text-slate-600 font-medium">Quote inquiry requests leading to confirmed client consultation sessions.</p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Quote Inquiries Received</span>
              <span className="text-2xl font-black text-slate-900 block">18</span>
              <span className="text-[10px] font-bold text-emerald-600">↑ 18% vs last month</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Consultations Scheduled</span>
              <span className="text-2xl font-black text-slate-900 block">8 Sessions</span>
              <span className="text-[10px] font-bold text-emerald-600">↑ 8% vs last week</span>
            </div>
          </div>
        </div>

      </section>

      {/* 5. RECENT ACTIVITY FEED & UPCOMING EVENTS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Recent Activity Feed */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#2563EB]" />
              <span>📋 Recent Activity Audit Feed</span>
            </h3>
            <Link to="/admin/analytics" className="text-xs font-black text-[#2563EB] hover:underline flex items-center gap-1">
              <span>View All Activity</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {activities && activities.length > 0 ? (
              activities.map((act) => (
                <div key={act.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4 hover:bg-blue-50/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center text-[#2563EB] font-black shrink-0">
                    {act.avatar ? (
                      <img src={act.avatar} alt={act.userName || act.user} className="w-full h-full rounded-xl object-cover" />
                    ) : (
                      (act.userName || act.user || 'S').charAt(0)
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-xs font-extrabold text-slate-900 leading-snug">{act.action}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-bold">
                      <span className="text-[#2563EB]">{act.userName || act.user}</span>
                      <span>•</span>
                      <span>{act.timeAgo}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs font-bold">
                No recent activity recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Right 4 Cols: Upcoming Events & Security Telemetry */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Upcoming Events */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>📅 Upcoming Events & Summit</span>
            </h3>

            <div className="space-y-3">
              {upcomingEvents.map((evt) => (
                <div key={evt.id} className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1">
                  <span className="text-[10px] font-black text-purple-700 uppercase block">{evt.date} • {evt.location}</span>
                  <h4 className="text-xs font-black text-slate-900">{evt.title}</h4>
                  <span className="text-[11px] font-bold text-slate-500 block">{evt.seats}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick System Telemetry Alert */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-3">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>🔔 System Security Telemetry</span>
            </h3>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Vulnerabilities Detected</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-medium">SengaShield SOC telemetry active & encrypted.</p>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
