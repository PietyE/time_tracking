import { useEffect, useState } from 'react';
import api from 'api';
import { useDebounce } from 'hooks/useDebounce';
import type { Users } from 'api/models/users';

export const useApiSearch = (value: string, delay: number): Users => {
  const searchWord = useDebounce(value, delay);
  const [users, setUsers] = useState<Users>([]);

  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      const { data } = await api.users.getUsers({
        search: searchWord,
        page_size: 200,
      });
      setUsers(data.items);
    };
    void getUsers();
  }, [searchWord]);

  return users;
};
