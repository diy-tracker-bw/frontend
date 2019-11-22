import { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

export const useAxiosWithAuth = endpoint => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(null);
    setError(null);
    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await axiosWithAuth().get(endpoint);
        const data = await res.data;
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [endpoint]);

  return { data, error, loading };
};
