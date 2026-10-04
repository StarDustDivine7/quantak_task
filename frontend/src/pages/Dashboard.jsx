import { useState } from 'react';
import { useTickets, useSummary } from '../hooks/useTickets';
import SummaryCards from '../components/SummaryCards';
import TicketTable from '../components/TicketTable';
import TicketFilters from '../components/TicketFilters';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    sortBy: 'created_at',
    sortOrder: 'desc'
  });
  const [page, setPage] = useState(1);

  const { data: summary, loading: summaryLoading, error: summaryError } = useSummary();
  const { data: ticketsData, loading: ticketsLoading, error: ticketsError, refetch } = useTickets({
    page,
    page_size: 10,
    search: filters.search || undefined,
    status: filters.status || undefined,
    priority: filters.priority || undefined,
    sort_by: filters.sortBy,
    sort_order: filters.sortOrder
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const totalPages = ticketsData ? Math.ceil(ticketsData.total / ticketsData.page_size) : 0;

  if (summaryLoading || ticketsLoading) return <Loading />;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>
        Dashboard
      </h1>

      <ErrorMessage message={summaryError || ticketsError} />

      <SummaryCards summary={summary} />

      <TicketFilters filters={filters} onFilterChange={handleFilterChange} />

      {ticketsLoading ? (
        <Loading />
      ) : ticketsData && ticketsData.tickets.length > 0 ? (
        <>
          <TicketTable tickets={ticketsData.tickets} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <EmptyState message="No tickets found matching your criteria" />
      )}
    </div>
  );
};

export default Dashboard;
