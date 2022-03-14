import { useCallback, useState } from 'react'
import { orderBy } from 'lodash'

const useSorting = (data, params) => {
  const [sorting, setSorting] = useState([]);

  const handleSortingChange = useCallback((data, params) => {
    const keys = Object.keys(params);

    const customFunc = (key) => (item) =>
      (typeof item[key] === 'string') ? item[key].toUpperCase() : (item[key] === null) ? 0 : item[key];
    
      const iteratees = keys
      .map(key => params[key] === null ? null : customFunc(key))
      .filter(item => item !==null);
  
    const sortOrders = keys
      .map(key => params[key] === null ? null : params[key] ? 'asc' : 'desc')
      .filter(item => item !== null);
    
    setSorting(() => {
      return orderBy(data, iteratees, sortOrders)
    })
  }, []);

  return {
    sorting,
    handleSortingChange
  }
}

export default useSorting;