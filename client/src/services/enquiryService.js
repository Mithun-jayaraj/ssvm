import api from './api';

export const submitEnquiry = async (formDataOrObject) => {
  // If FormData (with file uploads)
  if (formDataOrObject instanceof FormData) {
    const response = await api.post('/enquiries', formDataOrObject, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  const response = await api.post('/enquiries', formDataOrObject);
  return response.data;
};

// Admin enquiry methods
export const getAdminEnquiries = async (params = {}) => {
  const response = await api.get('/admin/enquiries', { params });
  return response.data;
};

export const getAdminEnquiryById = async (id) => {
  const response = await api.get(`/admin/enquiries/${id}`);
  return response.data;
};

export const updateAdminEnquiry = async (id, updateData) => {
  const response = await api.patch(`/admin/enquiries/${id}`, updateData);
  return response.data;
};

export const exportEnquiriesCSV = async () => {
  const response = await api.get('/admin/enquiries/export', {
    responseType: 'blob',
  });
  
  // Trigger file download in browser
  const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `SSVM_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
};
