const SummaryCards = ({ summary }) => {
  if (!summary) return null;

  const cards = [
    { label: 'Total', value: summary.total, color: '#2563eb' },
    { label: 'Open', value: summary.open, color: '#dc2626' },
    { label: 'In Progress', value: summary.in_progress, color: '#d97706' },
    { label: 'Resolved', value: summary.resolved, color: '#16a34a' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    }}>
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            borderLeft: `4px solid ${card.color}`
          }}
        >
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            {card.label}
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
