import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '1rem 2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Support Ticket Dashboard
        </Link>
        <nav>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', marginLeft: '2rem' }}>
            Dashboard
          </Link>
          <Link to="/create" style={{ color: 'white', textDecoration: 'none', marginLeft: '2rem' }}>
            Create Ticket
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
