import { useState } from 'react';
import { useLeaves } from './hooks/useLeaves';

// Layout Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Page Components
import Login from './pages/Login';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import ApplyLeave from './pages/ApplyLeave';
import LeaveHistory from './pages/LeaveHistory';
import LeaveBalance from './pages/LeaveBalance';
import LeaveDetails from './pages/LeaveDetails';
import LeaveRequests from './pages/LeaveRequests';
import Employees from './pages/Employees';
import Departments from './pages/Departments';

import './styles.css';

export default function App() {
  const [role, setRole] = useState(null);
  const [page, setPage] = useState('dashboard');
  const [selected, setSelected] = useState(null);

  const { data, submit, setStatus } = useLeaves();

  // 1. Unauthenticated State
  if (!role) {
    return (
      <Login
        onLogin={(selectedRole) => {
          setRole(selectedRole);
          setPage('dashboard');
        }}
      />
    );
  }

  // 2. Data Loading State
  if (!data) {
    return <div className="loading">Loading LeavePro…</div>;
  }

  // Active User Construction
  const currentUser = {
    ...data.user,
    role,
    name: role === 'manager' ? 'Rahul Patel' : data.user.name,
  };

  const dashboardProps = { data, setPage, setSelected };

  // Page Routing Logic
  const renderPageContent = () => {
    switch (page) {
      case 'dashboard':
        return role === 'manager' ? (
          <ManagerDashboard {...dashboardProps} />
        ) : (
          <EmployeeDashboard {...dashboardProps} />
        );

      case 'apply':
        return <ApplyLeave submit={submit} setPage={setPage} />;

      case 'history':
        return (
          <LeaveHistory
            leaves={(data.leaves || []).filter((leave) => leave.employeeId === 1)}
            setSelected={setSelected}
            setPage={setPage}
          />
        );

      case 'balance':
        return <LeaveBalance balances={data.balances || []} />;

      case 'details':
        return (
          <LeaveDetails
            leave={selected}
            role={role}
            setPage={setPage}
            setStatus={setStatus}
          />
        );

      case 'requests':
        return (
          <LeaveRequests
            leaves={data.leaves || []}
            setSelected={setSelected}
            setPage={setPage}
            setStatus={setStatus}
          />
        );

      case 'employees':
        return <Employees data={data} />;

      case 'departments':
        return <Departments departments={data.departments || []} />;

      default:
        return role === 'manager' ? (
          <ManagerDashboard {...dashboardProps} />
        ) : (
          <EmployeeDashboard {...dashboardProps} />
        );
    }
  };

  return (
    <div className="app">
      <Sidebar
        page={page}
        setPage={setPage}
        role={role}
        onLogout={() => {
          setRole(null);
          setSelected(null);
          setPage('dashboard');
        }}
      />

      <main className="main">
        <Header user={currentUser} />
        <div className="content">{renderPageContent()}</div>
      </main>
    </div>
  );
}