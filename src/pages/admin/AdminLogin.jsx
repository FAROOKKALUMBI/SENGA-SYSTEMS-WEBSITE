import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, UserCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@sengasystems.mw');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-slate-100/70 dark:bg-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden text-slate-900">
        
        {/* Top Dark Navy Header Banner matching mockup media_1788135636960.png */}
        <div className="bg-[#23275c] p-8 text-center text-white space-y-2 border-b border-indigo-900/40">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Employee Login
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 font-normal">
            Sign in to access your dashboard
          </p>
        </div>

        {/* White Card Body */}
        <div className="p-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
              />
            </div>

            {/* Password with Eye toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-11 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs font-medium text-slate-600 cursor-pointer select-none">
                Remember me
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#2b66bf] hover:bg-[#21519a] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login Presets */}
          <div className="pt-5 border-t border-slate-200 space-y-3">
            <span className="text-[11px] text-slate-500 font-bold block text-center uppercase tracking-wider">
              Quick Demo Login Presets:
            </span>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setPreset('admin@sengasystems.mw')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold text-left truncate transition-colors border border-slate-200 cursor-pointer"
              >
                👑 Super Admin
              </button>
              <button
                type="button"
                onClick={() => setPreset('editor@sengasystems.mw')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold text-left truncate transition-colors border border-slate-200 cursor-pointer"
              >
                📝 Content Editor
              </button>
              <button
                type="button"
                onClick={() => setPreset('biz@sengasystems.mw')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold text-left truncate transition-colors border border-slate-200 cursor-pointer"
              >
                💼 Biz Manager
              </button>
              <button
                type="button"
                onClick={() => setPreset('support@sengasystems.mw')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold text-left truncate transition-colors border border-slate-200 cursor-pointer"
              >
                🎧 Support Lead
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
