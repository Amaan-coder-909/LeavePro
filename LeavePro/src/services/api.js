import initialData from '../data/mockData.json';

// Helper to simulate asynchronous network latency
const delay = (value, ms = 180) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const api = {
  /**
   * Fetch initial mock dataset
   */
  getData: () => delay(initialData),

  /**
   * Submit a new leave request
   */
  submitLeave: (leave) => {
    const newLeave = {
      ...leave,
      id: Date.now(),
      status: 'Pending',
      appliedOn: new Date().toISOString().slice(0, 10),
    };

    return delay(newLeave);
  },

  /**
   * Update the status of an existing leave request
   */
  updateStatus: (leave, status) => {
    const updatedLeave = {
      ...leave,
      status,
    };

    return delay(updatedLeave);
  },
};