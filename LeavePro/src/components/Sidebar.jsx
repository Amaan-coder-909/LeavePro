import React from 'react';

const MENU_ITEMS = {
  employee: [
    { id: 'dashboard', icon: '⌂', label: 'Dashboard' },
    { id: 'apply', icon: '＋', label: 'Apply Leave' },
    { id: 'history', icon: '▣', label: 'My Leave History' },
    { id: 'balance', icon: '▤', label: 'Leave Balance' },
    { id: 'profile', icon: '♙', label: 'Profile' },
  ],
  manager: [
    { id: 'dashboard', icon: '⌂', label: 'Dashboard' },
    { id: 'requests', icon: '▣', label: 'Leave Requests' },
    { id: 'employees', icon: '♙', label: 'Employees' },
    { id: 'departments', icon: '⌘', label: 'Departments' },
  ],
};

export default function Sidebar({ page, setPage, role, onLogout }) {
  const navItems = MENU_ITEMS[role] || MENU_ITEMS.employee;

  return (
    <aside className="sidebar">
      <div className="brand">
        <span>♧</span> LeavePro
      </div>

      <nav>
        {navItems.map(({ id, icon, label }) => {
          const isActive = page === id;

          return (
            <button
              key={id}
              className={isActive ? 'active' : ''}
              onClick={() => setPage(id)}
            >
              <i>{icon}</i>
              {label}
            </button>
          );
        })}
      </nav>

      <button className="logout" onClick={onLogout}>
        ⇥ Logout
      </button>
    </aside>
  );
}