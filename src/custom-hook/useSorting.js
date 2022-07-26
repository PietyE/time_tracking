import { useCallback, useState } from 'react'
import { orderBy } from 'lodash'
import {
  ASCEND,
  DESCEND,
  LODASH_ASC,
  LODASH_DESC,
} from 'constants/order-constant'

const useSorting = (defaultSorting = {}) => {
  const [sorting, setSorting] = useState([])
  const [sortingParameter, setSortingParameters] = useState(defaultSorting)

  const toggleSortingParameter = (nameParam) => {
    if (sortingParameter[nameParam] === ASCEND) {
      setSortingParameters({ [nameParam]: DESCEND })
    } else if (sortingParameter[nameParam] === DESCEND) {
      setSortingParameters({ [nameParam]: null })
    } else {
      setSortingParameters({ [nameParam]: ASCEND })
    }
  }

  const handleSortingChange = useCallback(
    (data) => {
      const keys = Object.keys(sortingParameter)

      const customFunc = (key) => (item) =>
        typeof item[key] === 'string'
          ? item[key].toUpperCase()
          : item[key] === null
          ? 0
          : item[key]

      const iteratees = keys
        .map((key) => (sortingParameter[key] === null ? null : customFunc(key)))
        .filter((item) => item !== null)

      const sortOrders = keys
        .map((key) => {
          if (sortingParameter[key] === ASCEND) {
            return LODASH_ASC
          } else if (sortingParameter[key] === DESCEND) {
            return LODASH_DESC
          } else {
            return null
          }
        })
        .filter((item) => item !== null)

      setSorting(() => {
        return orderBy(data, iteratees, sortOrders)
      })
    },
    [sortingParameter]
  )

  return {
    sorting,
    sortingParameter,
    handleSortingChange,
    toggleSortingParameter,
  }
}

export default useSorting
