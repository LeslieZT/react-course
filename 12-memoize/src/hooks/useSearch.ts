import { useCallback, useEffect, useMemo, useState } from "react";
import { searchMusic } from "../service/searchMusic";

type SearchType = "album" | "artist" | "playlist";

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
  const [sortOption, setSortOption] = useState("");

  // Option 1
  // const fetchResults = useMemo(() => {
  //   return async () => {
  //     console.log("fetch result created");
  //     if (!searchQuery.trim()) return;
  //     setLoading(true);
  //     try {
  //       const { mappedResults } = await searchMusic(searchQuery, selectedOption);
  //       setResults(mappedResults);
  //     } catch (err: any) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // }, [searchQuery, selectedOption])

  // Option2
  const fetchResults = useCallback(async () => {
    console.log("fetch result created");
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const { mappedResults } = await searchMusic(searchQuery, selectedOption);
      setResults(mappedResults);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedOption]);

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchResults();
    }
  }, [selectedOption, searchQuery]);

  useEffect(() => {
    console.log("new Search ....");
  }, [searchQuery]);

  //// ---------------------------------------
  const sortedResult = useMemo(() => {
    const sorted = [...results].sort((a, b) => {
      console.log("sorted");
      if (sortOption === "releaseDate") {
        return (
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        );
      }
      if (sortOption === "followers") {
        return a.followers - b.followers;
      }
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      }
    });
    return sorted;
  }, [sortOption, results]);

  return {
    results: sortedResult,
    loading,
    setSortOption,
    error,
  };
};
