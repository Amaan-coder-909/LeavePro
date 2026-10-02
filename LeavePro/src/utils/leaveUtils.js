/**
 * Format date string (YYYY-MM-DD) to readable format (e.g., "12 Sep 2025")
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';

  try {
    // Append T00:00:00 to prevent UTC timezone boundary shifts
    const dateObj = new Date(`${dateString}T00:00:00`);

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(dateObj);
  } catch (err) {
    console.error('Invalid date string passed to formatDate:', dateString);
    return dateString;
  }
};

/**
 * Calculate total days inclusive between start and end date strings
 */
export const daysBetween = (startDate, endDate) => {
  if (!startDate || !endDate) return 1;

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  const diffMs = end - start;
  const ONE_DAY_MS = 86_400_000;

  // Calculate inclusive day difference
  const days = Math.round(diffMs / ONE_DAY_MS) + 1;

  return Math.max(1, days);
};

/**
 * Map leave type name to its abbreviated short code
 */
const LEAVE_CODE_MAP = {
  'Casual Leave': 'CL',
  'Sick Leave': 'SL',
  'Earned Leave': 'EL',
  'Privilege Leave': 'PL',
};

export const leaveCode = (leaveType) => {
  return LEAVE_CODE_MAP[leaveType] || leaveType || '';
};