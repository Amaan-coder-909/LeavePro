import React from 'react';

export default function Departments({ departments = [] }) {
  return (
    <>
      <h1>Departments</h1>
      <p className="subtitle">Organize your teams and roles</p>

      <section className="panel dept-list">
        {departments.map((department) => {
          const { name, count } = department;

          return (
            <button key={name} type="button" className="dept-item">
              <span>♧</span>
              <b>{name}</b>
              <small>({count})</small>
              <i>›</i>
            </button>
          );
        })}
      </section>
    </>
  );
}