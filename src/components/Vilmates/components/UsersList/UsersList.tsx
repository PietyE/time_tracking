import { type ChangeEvent, type FC, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { UsersListItem } from './components/UsersListItem';
import { useApiSearch } from './helpers';
import Loading from 'shared/components/Loading';
import { SearchField } from 'shared/components/SearchByField';

export const UsersList: FC = (): JSX.Element => {
  const [searchWord, setSearchWord] = useState<string>('');
  const { users, isLoading } = useApiSearch(searchWord, 500);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setSearchWord(event.target.value);

  if (isLoading) return <Loading />;

  return (
    <>
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
        {users?.length ? (
          users?.map((user) => (
            <Grid
              item
              xs={3}
              key={user.id}
            >
              <UsersListItem user={user} />
            </Grid>
          ))
        ) : (
          <Typography
            variant='h2'
            sx={{
              p: '30%',
            }}
          >
            No users found
          </Typography>
        )}
      </Grid>
    </>
  );
};
