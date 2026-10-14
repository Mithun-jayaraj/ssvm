import api from './api';

export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await api.get('/products/featured');
  return response.data;
};

export const getProductBySlug = async (slug) => {
  const response = await api.get(`/products/${slug}`);
  return response.data;
};

// Admin endpoints
export const getAdminProducts = async (params = {}) => {
  const response = await api.get('/admin/products', { params });
  return response.data;
};

export const getAdminProductById = async (id) => {
  const response = await api.get(`/admin/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post('/admin/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/admin/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/admin/products/${id}`);
  return response.data;
};

export const uploadProductImages = async (formData) => {
  const response = await api.post('/admin/products/upload-images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
