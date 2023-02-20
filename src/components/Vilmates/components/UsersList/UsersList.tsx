import { type ChangeEvent, type FC, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { UsersListItem } from './components/UsersListItem';
import { useApiSearch } from './helpers';
import { useAppShallowSelector } from 'hooks/redux';
import { useScrollLock } from 'hooks/useScrollLock';
import {
  getUsers as getUsersSelector,
  getUsersLoading,
} from 'redux/selectors/users';
import Loading from 'shared/components/Loading';
import { SearchField } from 'shared/components/SearchByField';

export const UsersList: FC = (): JSX.Element => {
  const [searchWord, setSearchWord] = useState<string>('');
  const users = useAppShallowSelector(getUsersSelector);
  useApiSearch(searchWord, 500);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setSearchWord(event.target.value);

  return (
    <>
      <UsersListLoader />
      <Box mb={30}>
        <SearchField
          value={searchWord}
          onChange={onChange}
        />
      </Box>
      <Grid
        container
        spacing={32}
      >
        {users.map((user) => (
          <Grid
            item
            xs={3}
            key={user.id}
          >
            <UsersListItem user={user} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const UsersListLoader: FC = (): JSX.Element => {
  const isLoading = useAppShallowSelector(getUsersLoading);
  useScrollLock(isLoading);

  return <>{isLoading && <Loading />}</>;
};
