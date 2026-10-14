import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { admin, isAuthenticated, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6ED] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products Catalogue', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Quotation Enquiries', path: '/admin/enquiries', icon: Inbox },
    { name: 'Business Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F5EFE5] flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#260811] text-white border-r-2 border-gold-600/40 shrink-0">
        {/* Brand in Sidebar */}
        <div className="p-6 border-b border-gold-600/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-gold-500 bg-[#380E1B] flex items-center justify-center p-1 shadow-gold-glow">
            <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
              <circle cx="32" cy="32" r="30" fill="#4A1424" stroke="#C5A15B" strokeWidth="2"/>
              <path d="M18 48 C18 22, 46 22, 46 48" stroke="#C5A15B" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="32" cy="14" r="3" fill="#C5A15B"/>
              <path d="M32 20 L35 27 L29 27 Z" fill="#C5A15B"/>
            </svg>
          </div>
          <div>
            <span className="font-serif font-bold text-sm tracking-wide text-gold-400 block">
              SSVM ADMIN
            </span>
            <span className="text-[10px] text-[#EDE4D5]/70 block">
              Tirupur Foundry Portal
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'bg-maroon-800 text-gold-300 border-l-4 border-gold-500 shadow-xs'
                      : 'text-[#EDE4D5]/80 hover:bg-maroon-900 hover:text-gold-300'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Badge & Actions */}
        <div className="p-4 border-t border-gold-600/30 bg-[#1D060D] space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gold-600 text-maroon-950 font-bold text-xs flex items-center justify-center">
              {admin?.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-serif font-bold text-xs text-gold-300 block truncate">
                {admin?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-[#FAF6ED]/60 block truncate">
                {admin?.email}
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-1.5">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#FAF6ED]/70 hover:text-gold-300 flex items-center gap-2 py-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-2 py-1 transition-colors w-full text-left"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gold-600/30 h-16 px-4 sm:px-6 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-charcoal hover:bg-beige rounded"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="font-serif font-bold text-base text-maroon-950">
              Sri Shakthi Vinayaga Metals Management
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-maroon-800 hover:text-gold-700 font-semibold border border-gold-600/40 px-3 py-1.5 rounded bg-beige-light transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Public Site</span>
            </Link>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/60 flex">
            <div className="w-64 bg-[#260811] text-white p-4 space-y-4 flex flex-col">
              <div className="flex items-center justify-between border-b border-gold-600/30 pb-3">
                <span className="font-serif font-bold text-gold-400">SSVM Admin</span>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 text-gold-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold ${
                          isActive
                            ? 'bg-maroon-800 text-gold-300'
                            : 'text-[#EDE4D5]/80 hover:bg-maroon-900'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 text-gold-500" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>

              <div className="border-t border-gold-600/30 pt-3 space-y-2">
                <Link
                  to="/"
                  target="_blank"
                  className="text-xs text-gold-400 flex items-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Public Site</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs text-red-400 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
