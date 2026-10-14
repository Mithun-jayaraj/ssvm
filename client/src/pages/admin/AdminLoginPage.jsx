import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const sessionExpired = new URLSearchParams(location.search).get('sessionExpired');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your administrative email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid administrative credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#260811] via-[#380E1B] to-[#4A1424] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border-2 border-gold-600 shadow-2xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-[#4A1424] text-white p-8 text-center border-b border-gold-600 relative">
          <div className="w-14 h-14 rounded-full border-2 border-gold-500 bg-[#380E1B] flex items-center justify-center mx-auto mb-3 shadow-gold-glow">
            <Lock className="w-6 h-6 text-gold-400" />
          </div>
          <h1 className="font-serif font-bold text-xl text-gold-300 tracking-wide">
            Administrator Portal
          </h1>
          <p className="text-xs text-[#FAF6ED]/75 mt-1 font-medium">
            Sri Shakthi Vinayaga Metals • Management Login
          </p>
        </div>

        {/* Login Form Body */}
        <div className="p-8 space-y-6">
          {sessionExpired && (
            <div className="p-3 bg-amber-50 border border-amber-300 text-amber-800 rounded text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Your session has expired. Please log in again.</span>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-300 text-red-800 rounded text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="admin@ssvmmetals.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg pl-9 pr-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                />
                <Mail className="w-4 h-4 text-gold-700 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg pl-9 pr-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                />
                <Lock className="w-4 h-4 text-gold-700 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-maroon-950 font-serif font-bold text-xs sm:text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Secure Login</span>
                </>
              )}
            </button>
          </form>

          {/* Seed credentials hint for development convenience */}
          <div className="p-3 bg-beige-light rounded-lg border border-gold-600/20 text-[11px] text-charcoal-muted">
            <span className="font-semibold block text-maroon-900">Initial Seed Credentials:</span>
            <span>Email: <code>admin@ssvmmetals.com</code></span>
            <br />
            <span>Password: <code>Admin@SSVM2026!</code></span>
          </div>

          <div className="pt-2 text-center">
            <Link
              to="/"
              className="text-xs text-maroon-800 hover:text-gold-700 font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
