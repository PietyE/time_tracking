import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useDebounce } from './useDebounce'

export const useApiSearch = (value, delay, action) => {
  const searchWord = useDebounce(value, delay)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(action(searchWord))
  }, [searchWord])
}
