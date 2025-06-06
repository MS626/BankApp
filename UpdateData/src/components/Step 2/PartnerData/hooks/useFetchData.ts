import { useState, useEffect } from "react";
import { get } from "../../../../API/RESTAdapter";

export function useFetchData<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get<T>(endpoint);
        setData(result);
      } catch (err) {
        console.error((err as Error).message);
        setError("Failed to load relatives.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  if (loading) {
    return { data, loading, error: null };
  }

  if (error) {
    return { data, loading: false, error };
  }

  return { data, loading: false, error: null };
}