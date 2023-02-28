import { useEffect } from 'react';
import { getUsers } from 'redux/asyncActions/users';
import { useDebounce } from 'hooks/useDebounce';
import { useAppDispatch } from 'hooks/redux';

export const useApiSearch = (value: string, delay: number): void => {
  const searchWord = useDebounce(value, delay);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getUsers({ search: searchWord, page_size: 200 }));
  }, [searchWord, dispatch]);
};
