/**
 * Validates leave application form fields
 * @param {Object} form - Form data containing type, start, end, and reason
 * @returns {Object} errors - Key-value pair of field validation errors
 */
export function validateLeave(form = {}) {
  const errors = {};

  const { type, start, end, reason = '' } = form;

  // 1. Leave Type Validation
  if (!type) {
    errors.type = 'Choose a leave type.';
  }

  // 2. Start Date Validation
  if (!start) {
    errors.start = 'Start date is required.';
  }

  // 3. End Date Validation
  if (!end) {
    errors.end = 'End date is required.';
  }

  // 4. Date Range Logic Validation
  if (start && end && new Date(end) < new Date(start)) {
    errors.end = 'End date must be after or equal to start date.';
  }

  // 5. Reason Validation
  if (!reason || !reason.trim()) {
    errors.reason = 'Please provide a reason.';
  }

  return errors;
}