import React, { useState } from 'react';
import { Plus, Trash2, FileText, Image, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminPosts() {
  const { posts, addPost, deletePost, user } = useCMS();
  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'news',
    category: 'Artificial Intelligence',
    author: user?.name || 'Editorial Team',
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
      author: user?.name || 'Editorial Team',
      excerpt: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      location: '',
      urgency: 'Normal'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Posts & Updates Content Manager</h1>
          <p className="text-xs text-slate-400">Publish and manage News, Events, AI Insights, and Announcements</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{showCreate ? 'Close Publisher' : 'Publish New Content'}</span>
        </button>
      </div>

      {/* CREATE POST FORM */}
      {showCreate && (
        <div className="glass-card bg-[#0F172A] border border-blue-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            Create & Publish New Post
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Post Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Senga Systems Launches New AI Cyber Hub in Blantyre"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Content Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                >
                  <option value="news">News & Press</option>
                  <option value="insights">Insights & Blog</option>
                  <option value="events">Training & Event</option>
                  <option value="announcements">Announcement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Category</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Artificial Intelligence"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Author Name</label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Cover Image URL</label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Short Excerpt</label>
              <input
                type="text"
                required
                placeholder="Brief 1-2 sentence summary..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Full Body Content</label>
              <textarea
                rows="4"
                required
                placeholder="Detailed publication body..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              Publish Post to Live Website
            </button>
          </form>
        </div>
      )}

      {/* POSTS LIST TABLE */}
      <div className="glass-card bg-[#0F172A] border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white">Live Published Content ({posts.length})</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-300 font-mono text-[10px] uppercase font-bold">
                    {post.type}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{post.date}</span>
                </div>

                <h3 className="font-bold text-white text-sm">{post.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{post.excerpt || post.content}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">By {post.author}</span>
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
