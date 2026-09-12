import api from './api';

export const getPrograms   = () => api.get('/programs');
export const getProgram    = id => api.get(`/programs/${id}`);
export const createProgram = data => api.post('/programs', data);
export const updateProgram = (id, data) => api.put(`/programs/${id}`, data);
export const deleteProgram = id => api.delete(`/programs/${id}`);
