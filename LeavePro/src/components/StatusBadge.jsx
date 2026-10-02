export default function StatusBadge({ status = '' }) {
  const statusClass = status ? status.toLowerCase() : 'default';

  return <span className={`badge ${statusClass}`}>{status}</span>;
}