import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function useLeaves() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    api
      .getData()
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const submit = async (form) => {
    try {
      const payload = {
        ...form,
        employeeId: 1,
        employee: 'Piyush Nakrani',
        title: 'Frontend Developer',
      };

      const added = await api.submitLeave(payload);

      setData((prev) => ({
        ...prev,
        leaves: [added, ...(prev?.leaves || [])],
      }));

      return added;
    } catch (err) {
      console.error('Failed to submit leave request:', err);
      throw err;
    }
  };

  const setStatus = async (id, status) => {
    try {
      const current = data?.leaves?.find((leave) => leave.id === id);
      if (!current) return;

      const updated = await api.updateStatus(current, status);

      setData((prev) => ({
        ...prev,
        leaves: (prev?.leaves || []).map((leave) =>
          leave.id === id ? updated : leave
        ),
      }));

      return updated;
    } catch (err) {
      console.error(`Failed to update leave status for ID ${id}:`, err);
      throw err;
    }
  };

  return { data, loading, error, submit, setStatus };
}