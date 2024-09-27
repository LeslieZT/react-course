import { useEffect, useState } from 'react';
import { Post } from '../components/Posts/Post.types';

export const useFetch = ({ url }: { url: string }) => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string>();

  useEffect(() => {
    const controller = new AbortController(); // API NATIVA DE NAVEGADORES permite abortar el fetching
    setLoading(true);

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
        setErrors(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [url]);

  return { data, errors, loading };
};