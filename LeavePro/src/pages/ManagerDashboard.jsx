import LeaveTable from '../components/LeaveTable';

export default function ManagerDashboard({ data, setPage, setSelected }) {
  // Extract data with defensive fallbacks
  const employees = data?.employees || [];
  const leaves = data?.leaves || [];

  const pendingRequests = leaves.filter((leave) => leave.status === 'Pending');
  const approvedThisMonth = leaves.filter(
    (leave) => leave.status === 'Approved'
  );

  const handleView = (leave) => {
    setSelected?.(leave);
    setPage?.('details');
  };

  return (
    <>
      <h1>Manager Dashboard</h1>
      <p className="subtitle">
        Here is an overview of your team’s leave activity.
      </p>

      {/* Team Metric Cards */}
      <div className="stats">
        <article className="stat">
          <small>Team Members</small>
          <b>{employees.length}</b>
        </article>
        <article className="stat green">
          <small>Pending Requests</small>
          <b>{pendingRequests.length}</b>
        </article>
        <article className="stat purple">
          <small>Approved Requests</small>
          <b>{approvedThisMonth.length}</b>
        </article>
      </div>

      {/* Recent Leave Requests Panel */}
      <section className="panel">
        <div className="panel-title">
          <h3>Recent leave requests</h3>
          <button
            type="button"
            className="secondary"
            onClick={() => setPage?.('requests')}
          >
            View all
          </button>
        </div>

        <LeaveTable
          leaves={leaves.slice(0, 5)}
          manager
          onView={handleView}
        />
      </section>
    </>
  );
}