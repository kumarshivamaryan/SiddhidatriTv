import React, { useState } from 'react';
import { adminLogin } from '../../services/api';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await adminLogin({ email, password });
      onLoginSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid administrative credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--line)] rounded-3xl p-7 sm:p-9 shadow-2xl space-y-6 text-left">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#ba0f18]/15 border border-[#ba0f18]/30 text-[#ba0f18] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Console</h2>
          <p className="text-xs text-[var(--muted)]">Sign in with authorized studio credentials to manage inquiries and gallery items.</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-900/20 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="admin@siddhidatritv.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-sm focus:outline-none focus:border-[#ba0f18]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-sm focus:outline-none focus:border-[#ba0f18]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#ba0f18] hover:bg-[#e22630] font-bold text-white text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
            <ArrowRight className="w-4 h-4 text-[#f5b400]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;