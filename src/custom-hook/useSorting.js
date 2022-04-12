import { useCallback, useState } from 'react'
import { orderBy } from 'lodash'

const useSorting = () => {
  const [sorting, setSorting] = useState([]);
  const [sortingParameter, setSortingParameters] = useState({})

  const toggleSortingParameter = (nameParam) => {
    const [prevParams] = Object.keys(sortingParameter)
    if (sortingParameter[nameParam] === null  || prevParams !== nameParam ) {
      setSortingParameters({[nameParam]: true}) 
    } else if (sortingParameter[nameParam] === true) {
      setSortingParameters({[nameParam]: false}) 
    } else {
      setSortingParameters({[nameParam]: null}) 
    }
  }

  const handleSortingChange = useCallback((data) => {
    const keys = Object.keys(sortingParameter);

    const customFunc = (key) => (item) =>
      (typeof item[key] === 'string') ? item[key].toUpperCase() : (item[key] === null) ? 0 : item[key];
    
      const iteratees = keys
      .map(key => sortingParameter[key] === null ? null : customFunc(key))
      .filter(item => item !==null);
  
    const sortOrders = keys
      .map(key => sortingParameter[key] === null ? null : sortingParameter[key] ? 'asc' : 'desc')
      .filter(item => item !== null);
    
    setSorting(() => {
      return orderBy(data, iteratees, sortOrders)
    })
  }, []);

  return {
    sorting,
    sortingParameter,
    handleSortingChange,
    toggleSortingParameter
  }
}

export default useSorting;