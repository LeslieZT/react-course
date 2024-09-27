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
  const [sortOption , setSortOption ] = useState('')

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


  const sorted = [...results].sort((a, b) => {
    console.log('sorted');
    if (sortOption === 'releaseDate') {
      return (
        new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
      );
    }
    if (sortOption === 'followers') {
      return a.followers - b.followers;
    }
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    }
  });



  return {
    results: sorted,
    loading,
    setSortOption,
    error,
  };
};
