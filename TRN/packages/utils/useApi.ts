import { useState, useEffect } from 'react';

// Get the current host for API calls (works in both local and Replit environments)
const getApiBaseUrl = () => {
  // For react-native-web running in browser
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    return `http://${host}:3000`;
  }
  // Fallback for React Native
  return 'http://localhost:3000';
};

const API_BASE_URL = getApiBaseUrl();

interface ApiOptions {
  initialFetch?: boolean;
  endpoint?: string;
}

export const useApi = (endpoint?: string, options: ApiOptions = { initialFetch: true }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (url = endpoint) => {
    if (!url) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}${url}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }
      
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const post = async (url: string, body: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }
      
      return result;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const put = async (url: string, body: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }
      
      return result;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (url: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }
      
      return result;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const get = fetchData;
  const refetch = () => fetchData(endpoint);

  useEffect(() => {
    if (options.initialFetch && endpoint) {
      fetchData();
    }
  }, [endpoint]);

  return {
    data,
    loading,
    error,
    refetch,
    get,
    post,
    put,
    remove,
  };
};
