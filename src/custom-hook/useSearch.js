import { useMemo, useState } from 'react'

export const useSearch = (initialUsers, value) => {
  const [users, setUsers] = useState(initialUsers)

  const filteredUsers = useMemo(
    () =>
      users.filter(({ name }) =>
        name.trim().toLowerCase().includes(value.trim().toLowerCase())
      ),
    [value]
  )

  return [filteredUsers, setUsers]
}
