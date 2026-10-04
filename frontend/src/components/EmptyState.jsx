const EmptyState = ({ message = 'No tickets found' }) => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      color: '#6b7280'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
      <p style={{ fontSize: '1.125rem' }}>{message}</p>
    </div>
  );
};

export default EmptyState;
