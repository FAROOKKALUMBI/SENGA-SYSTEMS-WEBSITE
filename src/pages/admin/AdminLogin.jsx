import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FieldError, useFormValidation } from '../../hooks/useFormValidation.jsx';

export default function AdminLogin() {
  const [email, setEmail] = useState('farook@sengasystems.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const validation = useFormValidation({ email: { type: 'email', required: true }, password: { type: 'password', required: true } });
  const { login } = useCMS();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const values = { email: email.trim(), password: password.trim() };
    if (!validation.validateAll(values)) return;
    setLoginError('');
    setLoading(true);
    const res = await login(values.email, values.password);
    setLoading(false);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setLoginError(res.error || 'Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#d9d9d9] font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. Website Top Navbar */}
      <Navbar />

      {/* 2. Middle Login Card Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 my-8">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-300 shadow-2xl overflow-hidden text-slate-900">
          
          {/* Top Dark Navy Banner */}
          <div className="bg-[#23275c] p-8 sm:p-10 text-center text-white space-y-2 border-b border-indigo-900/40">
            <div className="flex justify-center mb-4">
              <img 
                src="/assets/logo/senga-logo-white.png" 
                alt="SENGA SYSTEMS Logo" 
                className="h-14 sm:h-16 object-contain filter drop-shadow-xl" 
                onError={(e) => {
                  e.target.src = '/assets/logo/senga-logo.png';
                }}
              />
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
            <form noValidate onSubmit={handleLogin} className="space-y-5">
              {loginError && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{loginError}</p>}
              
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
                  {...validation.fieldProps('email', email)}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all shadow-xs"
                />
                <FieldError name="email" error={validation.errors.email} />
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
                    {...validation.fieldProps('password', password)}
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
                <FieldError name="password" error={validation.errors.password} />
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
      </main>

      {/* 3. Website Bottom Footer */}
      <Footer />

    </div>
  );
}
