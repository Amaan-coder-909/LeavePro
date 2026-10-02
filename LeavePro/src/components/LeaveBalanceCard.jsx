export default function LeaveBalanceCard({ balance }) {
  const { total, used, color, type, code } = balance;
  const remaining = total - used;
  const progressPercentage = Math.round((remaining / total) * 100);

  return (
    <article className={`balance-card ${color}`}>
      <div className="card-header">
        <strong>{type}</strong>
        <span>{code}</span>
      </div>

      <b className="balance-count">
        {remaining} / {total}
      </b>

      <div className="progress">
        <i style={{ width: `${progressPercentage}%` }} />
      </div>

      <small>{remaining} days remaining</small>
    </article>
  );
}