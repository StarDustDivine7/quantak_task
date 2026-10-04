import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ticketApi } from '../services/ticketApi';
import TicketForm from '../components/TicketForm';
import ErrorMessage from '../components/ErrorMessage';

const CreateTicket = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setError(null);
      await ticketApi.createTicket(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create ticket');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>
        Create New Ticket
      </h1>

      <ErrorMessage message={error} />

      {submitting ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Creating ticket...</div>
      ) : (
        <TicketForm onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default CreateTicket;
