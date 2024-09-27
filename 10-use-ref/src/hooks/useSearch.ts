import { useEffect, useState } from "react";
import { searchMusic } from "../service/searchMusic";

type SearchType = 'album' | 'artist' | 'playlist';

export const useSearch = ({
  searchQuery,
  selectedOption,
}: {
  searchQuery: string;
  selectedOption: SearchType;
}) => {
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const { mappedResults } = await searchMusic(
        searchQuery,
        selectedOption
      );
      setResults(mappedResults);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchResults();
    }
  }, [selectedOption, searchQuery]);


  return {
    results,
    loading,
    error,
  };
};
