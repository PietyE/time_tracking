import { useCallback, useState } from 'react'

const useSorting = () => {
  const [sorting, setSorting] = useState([]);

  const handleSortingChange = useCallback((sortData) => {
    setSorting((prev) => {
      const ascSort = prev?.length === 0;
      const descSort = prev?.[0]?.direction === 'asc';

      if (ascSort || descSort) {

        return sortData;
      }

      const noneSort = prev?.[0]?.direction === 'desc';

      if (noneSort) {

        return [];
      }
    })
  }, []);

  return {
    sorting,
    handleSortingChange
  }
}

export default useSorting;