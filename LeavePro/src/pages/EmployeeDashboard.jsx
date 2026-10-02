import LeaveBalanceCard from '../components/LeaveBalanceCard';
import LeaveTable from '../components/LeaveTable';

export default function EmployeeDashboard({ data, setPage, setSelected }) {
  // Extract user-specific leaves with defensive fallbacks
  const userLeaves = data?.leaves?.filter((leave) => leave.employeeId === 1) || [];
  const pendingCount = userLeaves.filter((leave) => leave.status === 'Pending').length;
  const balances = data?.balances || [];

  const handleViewDetails = (leave) => {
    setSelected(leave);
    setPage('details');
  };

  return (
    <>
      <h1>Dashboard</h1>
      <p className="subtitle">Welcome back, Piyush!</p>

      {/* Overview Metric Cards */}
      <div className="stats">
        <Stat label="Total Leaves" value="12" />
        <Stat label="Used Leaves" value="5" variant="green" />
        <Stat label="Remaining Leaves" value="7" variant="purple" />
        <Stat label="Pending Requests" value={pendingCount} variant="orange" />
      </div>

      {/* Main Grid Content */}
      <div className="dash-grid">
        <section>
          <h3>
            Leave Balance <small>(Current Year)</small>
          </h3>
          <div className="balance-list">
            {balances.map((balance) => (
              <LeaveBalanceCard key={balance.code} balance={balance} />
            ))}
          </div>
        </section>

        <section>
          <h3>Recent Leave Requests</h3>
          <LeaveTable
            leaves={userLeaves.slice(0, 4)}
            onView={handleViewDetails}
          />
        </section>
      </div>

      {/* Quick Navigation Actions */}
      <h3>Quick Actions</h3>
      <div className="quick">
        <button
          type="button"
          className="primary"
          onClick={() => setPage('apply')}
        >
          Apply Leave
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => setPage('history')}
        >
          View Leave History
        </button>
      </div>
    </>
  );
}

// Internal Stat Badge Component
function Stat({ label, value, variant = '' }) {
  return (
    <article className={`stat ${variant}`.trim()}>
      <small>{label}</small>
      <b>{value}</b>
    </article>
  );
}