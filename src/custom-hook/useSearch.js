import { useMemo } from 'react'
import { useDebounce } from './useDebounce'

export const useSearch = (users, value, delay) => {
  const debouncedValue = useDebounce(value, delay)
  return useMemo(
    () =>
      users.filter(({ name }) =>
        name.trim().toLowerCase().includes(debouncedValue.trim().toLowerCase())
      ),
    [debouncedValue, users]
  )
}
