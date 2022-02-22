import { useCallback, useState } from 'react'
import { orderBy } from 'lodash'

const useSorting = (data, parameter, order) => {
  const [sorting, setSorting] = useState([]);

  const handleSortingChange = useCallback((sortData, sortParameter) => {

    setSorting(() => {
      return orderBy(sortData, [
        (sortParameter.name !== null) && ((item) => item.name.toUpperCase()),
        (sortParameter.total_minutes !== null) && ((item) => item.total_minutes === null ? 0 : item.total_minutes),
      ],
        [
          (sortParameter.name !== null) && (sortParameter.name ? 'asc' : 'desc'),
          (sortParameter.total_minutes !== null) && (sortParameter.total_minutes ? 'asc' : 'desc'),
        ]
      )
    })
  }, []);

  return {
    sorting,
    handleSortingChange
  }
}

export default useSorting;