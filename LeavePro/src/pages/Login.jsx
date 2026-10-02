import { useState } from 'react';

export default function Login({ onLogin }) {
  const [role, setRole] = useState('employee');
  const [email, setEmail] = useState('employee@company.com');
  const [password, setPassword] = useState('123456');

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setEmail(
      selectedRole === 'manager'
        ? 'manager@company.com'
        : 'employee@company.com'
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin?.({ role, email, password });
  };

  return (
    <main className="login-page">
      <section className="login-art">
        <div className="brand blue">▣ LeavePro</div>
        <div className="calendar">▦</div>
        <h3>
          Manage your leaves,
          <br />
          track your balance and
          <br />
          keep work-life balanced.
        </h3>
      </section>

      <section className="login-form">
        <h2>Welcome Back!</h2>
        <p>Login to your account to continue</p>

        <form onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>

          <button type="submit" className="primary full">
            Login as {role === 'manager' ? 'Manager' : 'Employee'}
          </button>
        </form>

        <p className="help">
          Don't have an account? <a href="#contact-hr">Contact your HR</a>
        </p>

        <div className="demo">
          <b>Demo Accounts</b>
          <button
            type="button"
            className={role === 'employee' ? 'active' : ''}
            onClick={() => handleRoleSelect('employee')}
          >
            👨‍💼 Employee Login
            <br />
            <small>employee@company.com / 123456</small>
          </button>
          <button
            type="button"
            className={role === 'manager' ? 'active' : ''}
            onClick={() => handleRoleSelect('manager')}
          >
            👩‍💼 Manager Login
            <br />
            <small>manager@company.com / 123456</small>
          </button>
        </div>
      </section>
    </main>
  );
}