import { Link } from 'react-router-dom';

const TicketTable = ({ tickets }) => {
  if (!tickets || tickets.length === 0) return null;

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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>ID</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Title</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Email</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Priority</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                style={{ borderBottom: '1px solid #e5e7eb', cursor: 'pointer', hover: { backgroundColor: '#f9fafb' } }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '1rem', color: '#6b7280' }}>#{ticket.id}</td>
                <td style={{ padding: '1rem' }}>
                  <Link
                    to={`/ticket/${ticket.id}`}
                    style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}
                  >
                    {ticket.title}
                  </Link>
                </td>
                <td style={{ padding: '1rem', color: '#6b7280' }}>{ticket.email}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    backgroundColor: getPriorityColor(ticket.priority),
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}>
                    {ticket.priority.replace('_', ' ')}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    backgroundColor: getStatusColor(ticket.status),
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: '#6b7280' }}>{formatDate(ticket.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketTable;
