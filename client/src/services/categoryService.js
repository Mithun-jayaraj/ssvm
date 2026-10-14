import api from './api';

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getCategoryBySlug = async (slug) => {
  const response = await api.get(`/categories/${slug}`);
  return response.data;
};

// Admin endpoints
export const getAdminCategories = async () => {
  const response = await api.get('/admin/categories');
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post('/admin/categories', categoryData);
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await api.put(`/admin/categories/${id}`, categoryData);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/admin/categories/${id}`);
  return response.data;
};
