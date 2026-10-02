import { useState } from 'react';
import { validateLeave } from '../utils/validation';

const LEAVE_TYPES = [
  'Casual Leave',
  'Sick Leave',
  'Earned Leave',
  'Privilege Leave',
];

const INITIAL_FORM_STATE = {
  type: 'Casual Leave',
  start: '',
  end: '',
  reason: '',
  halfDay: false,
};

export default function ApplyLeave({ submit, setPage }) {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear validation error on input change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLeave(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setSubmitting(true);
      await submit(form);
      setPage('history');
    } catch (err) {
      console.error('Failed to submit leave request:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM_STATE);
    setErrors({});
  };

  return (
    <>
      <h1>Apply Leave</h1>
      <p className="subtitle">Fill in the form to request a leave</p>

      <form className="panel leave-form" onSubmit={handleSubmit}>
        <label>
          Leave Type *
          <select name="type" value={form.type} onChange={handleChange}>
            {LEAVE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && <em className="error">{errors.type}</em>}
        </label>

        <div className="form-row">
          <label>
            Start Date *
            <input
              name="start"
              type="date"
              value={form.start}
              onChange={handleChange}
            />
            {errors.start && <em className="error">{errors.start}</em>}
          </label>

          <label>
            End Date *
            <input
              name="end"
              type="date"
              value={form.end}
              onChange={handleChange}
            />
            {errors.end && <em className="error">{errors.end}</em>}
          </label>
        </div>

        <label>
          Reason *
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Enter reason for leave..."
          />
          {errors.reason && <em className="error">{errors.reason}</em>}
        </label>

        <label className="check">
          <input
            name="halfDay"
            type="checkbox"
            checked={form.halfDay}
            onChange={handleChange}
          />
          Half Day <small>(Optional)</small>
        </label>

        <div className="form-actions">
          <button
            type="button"
            className="secondary"
            onClick={handleReset}
            disabled={submitting}
          >
            Reset
          </button>
          <button type="submit" className="primary" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Apply Leave'}
          </button>
        </div>
      </form>
    </>
  );
}