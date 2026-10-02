import { useState, useMemo } from 'react';
import LeaveTable from '../components/LeaveTable';

export default function LeaveRequests({
  leaves = [],
  setSelected,
  setPage,
  setStatus,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter leaves based on search query and status dropdown
  const filteredLeaves = useMemo(() => {
    return leaves.filter((leave) => {
      const matchSearch =
        leave.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        statusFilter === 'All' || leave.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [leaves, searchQuery, statusFilter]);

  const handleView = (leave) => {
    setSelected?.(leave);
    setPage?.('details');
  };

  return (
    <>
      <h1>Leave Requests</h1>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search by name, leave type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Dynamic Status Quick-Filter Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-select"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <section className="panel">
        <LeaveTable
          leaves={filteredLeaves}
          manager
          onStatus={setStatus}
          onView={handleView}
        />
      </section>
    </>
  );
}