import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('farook@sengasystems.com');
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#d9d9d9] font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-300 shadow-2xl overflow-hidden text-slate-900 my-auto">
        
        {/* Top Dark Navy Banner */}
        <div className="bg-[#23275c] p-8 sm:p-10 text-center text-white space-y-2 border-b border-indigo-900/40">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-cyan-300 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Employee Login
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 font-normal">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Card Body Form */}
        <div className="p-8 sm:p-10 space-y-6">
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all shadow-xs"
              />
            </div>

            {/* Password with Eye toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-11 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 p-1.5 transition-colors cursor-pointer"
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
              <label htmlFor="remember" className="text-xs font-semibold text-slate-600 cursor-pointer select-none">
                Remember me
              </label>
            </div>

            {/* Sign In Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* Footer Below Login Card */}
      <footer className="mt-8 text-center text-xs font-semibold text-slate-600 space-y-1">
        <p>© 2025 Senga Systems Limited • Admin version 2.4.0</p>
        <p>Support Email: <a href="mailto:help@sengasystems.com" className="text-[#2563EB] hover:underline">help@sengasystems.com</a></p>
      </footer>

    </div>
  );
}
