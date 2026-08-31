import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Newspaper, 
  Calendar, 
  Lightbulb, 
  Briefcase, 
  Bell, 
  ArrowRight, 
  Clock, 
  User, 
  MapPin, 
  CheckCircle,
  Tag
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function UpdatesPages() {
  const location = useLocation();
  const type = location.pathname.split('/updates/')[1] || '';
  const { posts, vacancies } = useCMS();

  // Filter posts by type if on subpage
  const filteredPosts = type ? posts.filter(p => p.type === type) : posts;

  return (
    <div className="space-y-0 bg-[#ffffff] font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. TOP HERO BANNER (Deep Navy #23275c, NO outline/border) */}
      <section className="bg-[#23275c] text-white py-12 md:py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#23275c] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-blue-300">COMPANY NEWS & UPDATES</span>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
                  {type === 'news' && 'Company News & Press'}
                  {type === 'events' && 'Training Opportunities & Events'}
                  {type === 'insights' && 'Insights, Blog & AI Trends'}
                  {type === 'vacancies' && 'Careers & Open Vacancies'}
                  {type === 'announcements' && 'Important Announcements'}
                  {!type && 'Updates & Insights Hub'}
                </h1>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                <Link to="/updates/news" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${type === 'news' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'}`}>News</Link>
                <Link to="/updates/events" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${type === 'events' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'}`}>Events</Link>
                <Link to="/updates/vacancies" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${type === 'vacancies' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'}`}>Vacancies</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC CONTENT ON WHITE BACKGROUND (#ffffff) */}
      <div className="bg-[#ffffff] py-16 px-4 md:px-12">
        
        {/* VACANCIES SUBPAGE SPECIAL VIEW */}
        {type === 'vacancies' ? (
          <section className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-[#2563EB]" />
                <span>Open Career Vacancies</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono font-bold">{vacancies.length} Position(s) Available</span>
            </div>

            {vacancies.length === 0 ? (
              <div className="bg-[#d9d9d9] border border-slate-300 p-12 rounded-3xl text-center text-slate-700 font-medium">
                No vacancies have been posted yet. Please check back soon.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vacancies.map((job) => (
                  <div key={job.id} className="bg-[#d9d9d9] p-6 sm:p-8 rounded-3xl border border-slate-300 shadow-md space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-lg bg-blue-600 text-white font-mono text-[11px] font-bold">{job.department}</span>
                        <span className="text-xs font-mono text-slate-700 font-bold">{job.type}</span>
                      </div>

                      <h3 className="text-xl font-black text-[#0F172A]">{job.title}</h3>

                      <div className="flex items-center gap-4 text-xs text-slate-700 font-semibold">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#2563EB]" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#2563EB]" /> Deadline: {job.deadline}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">{job.description}</p>

                      {job.requirements && (
                        <div className="space-y-1.5 pt-2">
                          <span className="text-[11px] font-bold text-slate-900 uppercase">Requirements:</span>
                          {job.requirements.map((req, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-300">
                      <a
                        href={`mailto:careers@sengasystems.mw?subject=Application for ${encodeURIComponent(job.title)}`}
                        className="w-full py-3 rounded-xl bg-[#23275c] hover:bg-blue-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                      >
                        <span>Apply for Position</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : (
          /* STANDARD POSTS & ARTICLES VIEW ON WHITE */
          <section className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] flex items-center gap-2">
                {type === 'news' && <Newspaper className="w-6 h-6 text-[#2563EB]" />}
                {type === 'events' && <Calendar className="w-6 h-6 text-purple-600" />}
                {type === 'insights' && <Lightbulb className="w-6 h-6 text-amber-600" />}
                {type === 'announcements' && <Bell className="w-6 h-6 text-red-600" />}
                {!type && <Newspaper className="w-6 h-6 text-[#2563EB]" />}
                <span className="capitalize">{type || 'All'} Posts</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono font-bold">{filteredPosts.length} Article(s)</span>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="bg-[#d9d9d9] border border-slate-300 p-12 rounded-3xl text-center text-slate-700 font-medium">
                {type === 'news' && 'No news has been posted yet. Please check back soon.'}
                {type === 'events' && 'No events have been posted yet. Please check back soon.'}
                {!type && 'No news or events have been posted yet. Please check back soon.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="bg-[#d9d9d9] rounded-3xl border border-slate-300 overflow-hidden shadow-md flex flex-col justify-between group hover:shadow-xl transition-all">
                    {post.image && (
                      <div className="h-48 overflow-hidden bg-slate-200">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6 sm:p-7 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                            {post.category || post.type}
                          </span>
                          <span className="text-[11px] text-slate-700 font-semibold">{post.date}</span>
                        </div>
                        <h3 className="font-black text-[#0F172A] text-lg group-hover:text-[#2563EB] transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal line-clamp-3">
                          {post.excerpt || post.content}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-300 flex items-center justify-between text-xs font-bold text-[#23275c]">
                        <span>Read Full Story</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

      </div>

    </div>
  );
}
