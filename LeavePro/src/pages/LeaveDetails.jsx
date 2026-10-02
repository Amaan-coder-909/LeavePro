import StatusBadge from '../components/StatusBadge';
import { formatDate, daysBetween } from '../utils/leaveUtils';

export default function LeaveDetails({ leave, role, setPage, setStatus }) {
  if (!leave) return <p className="empty-state">No request selected.</p>;

  const { id, employee, title, type, start, end, reason, status } = leave;

  // Extract initials for avatar (e.g., "Piyush Nakrani" -> "PN")
  const initials = employee
    ? employee
        .split(' ')
        .map((name) => name[0])
        .join('')
    : 'U';

  const totalDays = daysBetween(start, end);
  const backDestination = role === 'manager' ? 'requests' : 'history';

  const handleStatusChange = async (newStatus) => {
    await setStatus?.(id, newStatus);
    setPage(backDestination);
  };

  return (
    <>
      <button
        type="button"
        className="back"
        onClick={() => setPage(backDestination)}
      >
        ← Back
      </button>

      <h1>Leave Request Details</h1>

      <section className="detail-card">
        <div className="person">
          <div className="avatar">{initials}</div>
          <div>
            <b>{employee}</b>
            <small>{title}</small>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="detail-grid">
          <p>
            <small>Leave Type</small>
            {type}
          </p>
          <p>
            <small>Start Date</small>
            {formatDate(start)}
          </p>
          <p>
            <small>End Date</small>
            {formatDate(end)}
          </p>
          <p>
            <small>Total Days</small>
            {totalDays} {totalDays === 1 ? 'Day' : 'Days'}
          </p>
        </div>

        <p className="reason">
          <small>Reason</small>
          {reason}
        </p>

        {role === 'manager' && status === 'Pending' && (
          <div className="actions">
            <button
              type="button"
              className="approve"
              onClick={() => handleStatusChange('Approved')}
            >
              Approve
            </button>
            <button
              type="button"
              className="reject"
              onClick={() => handleStatusChange('Rejected')}
            >
              Reject
            </button>
          </div>
        )}
      </section>
    </>
  );
}