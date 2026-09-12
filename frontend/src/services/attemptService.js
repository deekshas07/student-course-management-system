import api from './api';

export const getAttempts      = () => api.get('/attempts');
export const getAttempt       = id => api.get(`/attempts/${id}`);
export const createAttempt    = data => api.post('/attempts', data);
export const updateAttempt    = (id, data) => api.put(`/attempts/${id}`, data);
export const deleteAttempt    = id => api.delete(`/attempts/${id}`);
