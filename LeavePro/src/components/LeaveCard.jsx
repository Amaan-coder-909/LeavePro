import StatusBadge from './StatusBadge';
import { formatDate } from '../utils/leaveUtils';

export default function LeaveCard({ leave, onView }) {
  const { type, status, start, end, reason } = leave;

  return (
    <article className="leave-card">
      <div className="card-row">
        <strong>{type}</strong>
        <StatusBadge status={status} />
      </div>

      <p>
        {formatDate(start)} — {formatDate(end)}
      </p>

      <small>{reason}</small>

      {onView && (
        <button className="text-btn" onClick={() => onView(leave)}>
          View request →
        </button>
      )}
    </article>
  );
}