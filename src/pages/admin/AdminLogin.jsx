import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, UserCheck, ArrowRight } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@sengasystems.mw');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const { login } = useCMS();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      navigate('/admin/dashboard');
    }
  };

  const setPreset = (presetEmail) => {
    setEmail(presetEmail);
    setPassword('admin123');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md glass-card bg-[#0F172A] border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 to-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Senga Staff Portal</h1>
            <p className="text-xs text-slate-400 mt-1">Authenticate to access CMS & Administrative Module</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Staff Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Preset Quick Login Buttons for Testing */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-semibold block text-center uppercase tracking-wider">Quick Demo Login Presets:</span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setPreset('admin@sengasystems.mw')}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 font-medium text-left truncate"
            >
              👑 Super Admin
            </button>
            <button
              onClick={() => setPreset('editor@sengasystems.mw')}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 font-medium text-left truncate"
            >
              📝 Content Editor
            </button>
            <button
              onClick={() => setPreset('biz@sengasystems.mw')}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 font-medium text-left truncate"
            >
              💼 Biz Manager
            </button>
            <button
              onClick={() => setPreset('support@sengasystems.mw')}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-medium text-left truncate"
            >
              🎧 Support Lead
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
