import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin as apiLoginAdmin, logoutAdmin as apiLogoutAdmin, getAdminMe } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('ssvm_admin');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ssvm_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('ssvm_token');
      if (storedToken) {
        try {
          const res = await getAdminMe();
          if (res.admin) {
            setAdmin(res.admin);
            localStorage.setItem('ssvm_admin', JSON.stringify(res.admin));
          }
        } catch (err) {
          console.warn('Session check failed:', err.message);
          setAdmin(null);
          setToken(null);
          localStorage.removeItem('ssvm_token');
          localStorage.removeItem('ssvm_admin');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await apiLoginAdmin(email, password);
    if (res.success) {
      setAdmin(res.admin);
      setToken(res.token);
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const logout = async () => {
    try {
      await apiLogoutAdmin();
    } finally {
      setAdmin(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: Boolean(admin && token),
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
