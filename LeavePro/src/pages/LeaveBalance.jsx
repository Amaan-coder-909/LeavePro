import LeaveBalanceCard from '../components/LeaveBalanceCard';

export default function LeaveBalance({ balances = [] }) {
  return (
    <>
      <h1>Leave Balance</h1>
      <p className="subtitle">Your current leave balance</p>

      {/* Balances Grid */}
      <div className="balances-grid">
        {balances.map((balance) => (
          <LeaveBalanceCard key={balance.code} balance={balance} />
        ))}
      </div>

      {/* Policy Section */}
      <section className="panel policy">
        <h3>Leave Balance Policy</h3>
        {balances.map(({ type, code, total }) => (
          <p key={code}>
            ○ <b>{type} ({code})</b>
            <span>{total} per year</span>
          </p>
        ))}
      </section>

      {/* Informational Notice */}
      <div className="notice">
        ⓘ &nbsp; <b>Note</b>
        <br />
        Leave balance will be updated after approval of your leave request.
      </div>
    </>
  );
}