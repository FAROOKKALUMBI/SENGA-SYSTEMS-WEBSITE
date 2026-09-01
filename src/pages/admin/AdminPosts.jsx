import React, { useState } from 'react';
import { Plus, Trash2, FileText, Image, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminPosts() {
  const { posts, addPost, deletePost, user } = useCMS();
  const canDelete = user?.roleCode === 'SYSTEM_ADMIN';
  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'news',
    category: 'Artificial Intelligence',
    author: user?.name || 'Mr. Farook Kalumbi',
    excerpt: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    location: '',
    urgency: 'Normal'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPost(formData);
    setShowCreate(false);
    setFormData({
      title: '',
      type: 'news',
      category: 'Artificial Intelligence',
      author: user?.name || 'Mr. Farook Kalumbi',
      excerpt: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      location: '',
      urgency: 'Normal'
    });
  };

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#2563EB]">Content Publishing Module</span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-[#2563EB]" />
            <span>Posts & Updates Content Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Publish and manage News, Events, AI Insights, and Announcements for the public website.
          </p>
        </div>

        <button
          onClick={() => setShowCreate(!showCreate)}
          className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-black text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{showCreate ? 'Close Publisher' : 'Publish New Content'}</span>
        </button>
      </div>

      {/* CREATE POST FORM */}
      {showCreate && (
        <div className="bg-white border border-slate-300 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-slate-900">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-5 h-5 text-[#2563EB]" />
            <span>Create & Publish New Content Article</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-800 uppercase mb-1">Post Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Senga Systems Launches New AI Cyber Hub in Blantyre"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase mb-1">Content Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
                >
                  <option value="news">News & Press</option>
                  <option value="insights">Insights & Blog</option>
                  <option value="events">Training & Event</option>
                  <option value="announcements">Announcement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 uppercase mb-1">Category</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Artificial Intelligence"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 uppercase mb-1">Author Name</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 uppercase mb-1">Short Excerpt *</label>
              <input
                type="text"
                required
                placeholder="Brief summary sentence..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 uppercase mb-1">Full Content / Body</label>
              <textarea
                rows={4}
                required
                placeholder="Write full article description..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-black text-sm shadow-md"
              >
                Publish Article to Website
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LIVE PUBLISHED CONTENT LISTING */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-xl font-black text-slate-900">Live Published Content ({posts.length})</h2>
          <span className="text-xs font-extrabold text-[#2563EB]">Active on Website</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-[#2563EB] font-black text-[10px] uppercase">
                    {post.type}
                  </span>
                  <span className="text-xs font-bold font-mono text-slate-500">{post.date}</span>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-snug">{post.title}</h3>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">{post.excerpt || post.content}</p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">By {post.author || 'Senga Team'}</span>
                {canDelete && <button
                  onClick={() => deletePost(post.id)}
                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
