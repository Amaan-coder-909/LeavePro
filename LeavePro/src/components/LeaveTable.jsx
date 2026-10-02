import StatusBadge from './StatusBadge';
import LeaveTypeBadge from './LeaveTypeBadge';
import { formatDate } from '../utils/leaveUtils';

export default function LeaveTable({
  leaves = [],
  manager = false,
  onView,
  onStatus,
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {manager && <th>Employee</th>}
            <th>Leave type</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => {
            const { id, employee, title, type, start, end, status } = leave;
            const isPending = status === 'Pending';

            return (
              <tr key={id}>
                {manager && (
                  <td>
                    <b>{employee}</b>
                    <small>{title}</small>
                  </td>
                )}
                <td>
                  <LeaveTypeBadge type={type} />
                  {type}
                </td>
                <td>{formatDate(start)}</td>
                <td>{formatDate(end)}</td>
                <td>
                  <StatusBadge status={status} />
                </td>
                <td>
                  {manager && isPending ? (
                    <span className="actions">
                      <button
                        className="approve"
                        onClick={() => onStatus?.(id, 'Approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="reject"
                        onClick={() => onStatus?.(id, 'Rejected')}
                      >
                        Reject
                      </button>
                    </span>
                  ) : (
                    <button className="view" onClick={() => onView?.(leave)}>
                      View
                    </button>
                  )}
                </td>
              </tr>
            )}
          )}
        </tbody>
      </table>
    </div>
  );
}