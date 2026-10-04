import { useState, useEffect } from 'react';
import { ticketApi } from '../services/ticketApi';

export const useTickets = (params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await ticketApi.getTickets(params);
      setData(result);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [JSON.stringify(params)]);

  return { data, loading, error, refetch: fetchTickets };
};

export const useTicket = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await ticketApi.getTicket(id);
        setData(result);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to fetch ticket');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTicket();
    }
  }, [id]);

  return { data, loading, error };
};

export const useSummary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await ticketApi.getSummary();
      setData(result);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return { data, loading, error, refetch: fetchSummary };
};
