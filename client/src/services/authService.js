import api from './api';

export const loginAdmin = async (email, password) => {
  const response = await api.post('/admin/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('ssvm_token', response.data.token);
    localStorage.setItem('ssvm_admin', JSON.stringify(response.data.admin));
  }
  return response.data;
};

export const logoutAdmin = async () => {
  try {
    await api.post('/admin/auth/logout');
  } finally {
    localStorage.removeItem('ssvm_token');
    localStorage.removeItem('ssvm_admin');
  }
};

export const getAdminMe = async () => {
  const response = await api.get('/admin/auth/me');
  return response.data;
};
