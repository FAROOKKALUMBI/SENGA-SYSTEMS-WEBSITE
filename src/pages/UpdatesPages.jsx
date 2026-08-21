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
    <div className="space-y-12 py-12">
      {/* Header Banner & Subpage Tabs */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="glass-card bg-[#0F172A] border border-slate-700 rounded-3xl p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-blue-400">Company News & Updates</span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
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
              <Link to="/updates" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${!type ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>All Updates</Link>
              <Link to="/updates/news" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${type === 'news' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>News</Link>
              <Link to="/updates/events" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${type === 'events' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Events</Link>
              <Link to="/updates/insights" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${type === 'insights' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Insights</Link>
              <Link to="/updates/vacancies" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${type === 'vacancies' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Vacancies</Link>
              <Link to="/updates/announcements" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${type === 'announcements' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Announcements</Link>
            </div>
          </div>
        </div>
      </section>

      {/* VACANCIES SUBPAGE SPECIAL VIEW */}
      {type === 'vacancies' ? (
        <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-400" />
              Open Career Vacancies
            </h2>
            <span className="text-xs text-slate-400 font-mono">{vacancies.length} Position(s) Available</span>
          </div>

          {vacancies.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl text-center text-slate-400">
              No open vacancies at the moment. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vacancies.map((job) => (
                <div key={job.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-blue-600/20 text-blue-300 font-mono text-[11px] font-bold">{job.department}</span>
                      <span className="text-xs font-mono text-slate-400">{job.type}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white">{job.title}</h3>

                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-400" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-400" /> Deadline: {job.deadline}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{job.description}</p>

                    {job.requirements && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase">Requirements:</span>
                        {job.requirements.map((req, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <a
                      href={`mailto:careers@sengasystems.mw?subject=Application for ${encodeURIComponent(job.title)}`}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
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
        /* POSTS GRID (NEWS, EVENTS, INSIGHTS, ANNOUNCEMENTS) */
        <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="glass-card rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between group">
                {post.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                      {post.type}
                    </span>
                  </div>
                )}

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="text-blue-400 font-semibold">{post.category || 'General'}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {post.excerpt || post.content}
                    </p>

                    {post.type === 'events' && post.location && (
                      <div className="p-2.5 rounded-lg bg-blue-600/10 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                        <span className="line-clamp-1">{post.location}</span>
                      </div>
                    )}

                    {post.type === 'announcements' && post.urgency && (
                      <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs flex items-center gap-2 font-mono">
                        <Bell className="w-3.5 h-3.5" />
                        <span>Urgency: {post.urgency}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-400">
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.author}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
