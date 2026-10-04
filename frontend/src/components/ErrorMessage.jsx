const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div style={{
      backgroundColor: '#fee2e2',
      border: '1px solid #ef4444',
      color: '#991b1b',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem'
    }}>
      <strong>Error:</strong> {message}
    </div>
  );
};

export default ErrorMessage;
