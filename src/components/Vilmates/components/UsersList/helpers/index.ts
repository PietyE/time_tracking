import { useEffect, useState } from 'react';
import api from 'api';
import { useDebounce } from 'hooks/useDebounce';
import type { Users } from 'api/models/users';

interface ReturnType {
  users: Users;
  isLoading: boolean;
}

export const useApiSearch = (value: string, delay: number): ReturnType => {
  const searchWord = useDebounce(value, delay);
  const [users, setUsers] = useState<Users>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      setIsLoading(true);
      const { data } = await api.users.getUsers({
        search: searchWord,
        page_size: 200,
      });
      setUsers(data.items);
      setIsLoading(false);
    };
    void getUsers();
  }, [searchWord]);

  return { users, isLoading };
};
