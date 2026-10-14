import api from './api';

export const getPublicSettings = async () => {
  const response = await api.get('/settings/public');
  return response.data;
};

export const getAdminSettings = async () => {
  const response = await api.get('/admin/settings');
  return response.data;
};

export const updateAdminSettings = async (settingsData) => {
  const response = await api.put('/admin/settings', settingsData);
  return response.data;
};

export const getDashboardMetrics = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};
