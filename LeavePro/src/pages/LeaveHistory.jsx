import { useState, useMemo } from 'react';
import LeaveTable from '../components/LeaveTable';

const LEAVE_TYPES = ['All', 'Casual Leave', 'Sick Leave', 'Earned Leave'];
const STATUS_OPTIONS = ['All Status', 'Pending', 'Approved', 'Rejected'];

export default function LeaveHistory({ leaves = [], setSelected, setPage }) {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  // Filter leaves dynamically by both Type and Status
  const filteredLeaves = useMemo(() => {
    return leaves.filter((leave) => {
      const matchesType =
        selectedType === 'All' || leave.type === selectedType;
      const matchesStatus =
        selectedStatus === 'All Status' || leave.status === selectedStatus;

      return matchesType && matchesStatus;
    });
  }, [leaves, selectedType, selectedStatus]);

  const handleViewDetails = (leave) => {
    setSelected?.(leave);
    setPage?.('details');
  };

  return (
    <>
      <h1>My Leave History</h1>
      <p className="subtitle">Track your past and upcoming leave requests</p>

      <div className="filters">
        {/* Leave Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {LEAVE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <section className="panel">
        <LeaveTable leaves={filteredLeaves} onView={handleViewDetails} />
      </section>
    </>
  );
}