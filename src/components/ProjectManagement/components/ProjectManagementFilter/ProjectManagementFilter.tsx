import { type FC } from 'react';
import { Box, Grid } from '@mui/material';
// import { Autocomplete } from 'shared/components/Autocomplete';
import { SelectMonthMemoized } from 'shared/components/SelectMonth';
import { useAppShallowSelector } from 'hooks/redux';
// import { getUsers } from 'redux/asyncActions/users';
import { getUsersLoading } from 'redux/selectors/users';
import { SkeletonWrapper } from 'shared/components/SkeletonWrapper';

export const ProjectManagementFilter: FC = (): JSX.Element => {
  // const users = useAppShallowSelector(getUsers);
  const isUsersLoading = useAppShallowSelector(getUsersLoading);
  return (
    <Grid
      container
      justifyContent='space-between'
      alignItems='center'
    >
      <Grid item>
        <Grid container>
          <Grid item>
            <SkeletonWrapper isLoading={isUsersLoading}>
              {/* {!!users.length && ( */}
              {/*  <Autocomplete */}
              {/*    options={[{}]} */}
              {/*    keysToName={} */}
              {/*    keysToId={} */}
              {/*    onChange={} */}
              {/*  /> */}
              {/* )} */}
            </SkeletonWrapper>
          </Grid>
          <SkeletonWrapper isLoading={[{}]}>
            {/* <Grid item> */}
            {/*  <Autocomplete */}
            {/*    options={} */}
            {/*    keysToName={} */}
            {/*    keysToId={} */}
            {/*    onChange={} */}
            {/*  /> */}
            {/* </Grid> */}
          </SkeletonWrapper>
        </Grid>
      </Grid>
      <Grid item>
        <Box>
          <SelectMonthMemoized initialYear={2015} />
        </Box>
      </Grid>
    </Grid>
  );
};
