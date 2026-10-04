import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ticketApi = {
  getTickets: async (params = {}) => {
    const response = await api.get('/api/tickets/', { params });
    return response.data;
  },

  getTicket: async (id) => {
    const response = await api.get(`/api/tickets/${id}`);
    return response.data;
  },

  createTicket: async (ticketData) => {
    const response = await api.post('/api/tickets/', ticketData);
    return response.data;
  },

  updateTicket: async (id, ticketData) => {
    const response = await api.patch(`/api/tickets/${id}`, ticketData);
    return response.data;
  },

  getSummary: async () => {
    const response = await api.get('/api/tickets/summary');
    return response.data;
  },
};
