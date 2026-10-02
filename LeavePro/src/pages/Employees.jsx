import { useState, useMemo } from 'react';

export default function Employees({ data }) {
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const employees = data?.employees || [];
  const departments = data?.departments || [];

  // Filter employees dynamically based on search query and selected department
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase()) ||
        employee.title.toLowerCase().includes(search.toLowerCase());

      const matchesDept =
        departmentFilter === 'All' ||
        employee.department === departmentFilter;

      return matchesSearch && matchesDept;
    });
  }, [employees, search, departmentFilter]);

  return (
    <>
      <div className="panel-title">
        <div>
          <h1>Employees</h1>
          <p className="subtitle">Manage employee profiles and departments</p>
        </div>
        <button type="button" className="primary">
          ＋ Add Employee
        </button>
      </div>

      <div className="toolbar">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or role..."
        />
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="All">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.name} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      <section className="panel">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <b>{employee.name}</b>
                    <small>{employee.title}</small>
                  </td>
                  <td>{employee.department}</td>
                  <td>{employee.email}</td>
                  <td>
                    <span className="badge approved">Active</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty-state">
                  No employees found matching your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}