import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTicket } from '../hooks/useTickets';
import { ticketApi } from '../services/ticketApi';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: ticket, loading, error, refetch } = useTicket(id);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const handleUpdate = async (field, value) => {
    try {
      setUpdating(true);
      setUpdateError(null);
      await ticketApi.updateTicket(id, { [field]: value });
      refetch();
    } catch (err) {
      setUpdateError(err.response?.data?.detail || 'Failed to update ticket');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <ErrorMessage message={error} />
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!ticket) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#dc2626';
      case 'in_progress': return '#d97706';
      case 'resolved': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#d97706';
      case 'low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: 'transparent',
          color: '#2563eb',
          border: '1px solid #2563eb',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '1.5rem'
        }}
      >
        ← Back to Dashboard
      </button>

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>
        Ticket #{ticket.id}
      </h1>

      <ErrorMessage message={updateError} />

      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#6b7280' }}>
            Title
          </label>
          <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>
            {ticket.title}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#6b7280' }}>
            Description
          </label>
          <div style={{ lineHeight: '1.6', color: '#374151' }}>
            {ticket.description}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#6b7280' }}>
            Email
          </label>
          <div style={{ color: '#374151' }}>{ticket.email}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#6b7280' }}>
              Status
            </label>
            <select
              value={ticket.status}
              onChange={(e) => handleUpdate('status', e.target.value)}
              disabled={updating}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                cursor: updating ? 'not-allowed' : 'pointer'
              }}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#6b7280' }}>
              Priority
            </label>
            <select
              value={ticket.priority}
              onChange={(e) => handleUpdate('priority', e.target.value)}
              disabled={updating}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                cursor: updating ? 'not-allowed' : 'pointer'
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#6b7280' }}>
              Created
            </label>
            <div style={{ color: '#374151' }}>{formatDate(ticket.created_at)}</div>
          </div>

          {ticket.updated_at && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#6b7280' }}>
                Last Updated
              </label>
              <div style={{ color: '#374151' }}>{formatDate(ticket.updated_at)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
