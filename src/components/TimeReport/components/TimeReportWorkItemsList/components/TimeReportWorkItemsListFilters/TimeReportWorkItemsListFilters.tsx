import { type FC, useEffect } from 'react';
import { Grid } from '@mui/material';
import { selectDeveloper, selectProject } from 'redux/slices/timereports';
import { SkeletonWrapper } from 'shared/components/SkeletonWrapper';
import { SelectMonth } from 'shared/components/SelectMonth';
import { Autocomplete } from 'shared/components/Autocomplete';
import {
  useAppDispatch,
  useAppSelector,
  useAppShallowSelector,
} from 'hooks/redux';
import { getUsers } from 'redux/asyncActions/users';
import {
  getUsers as getUsersSelector,
  getUsersLoading,
} from 'redux/selectors/users';
import {
  getDeveloperProject as getDeveloperProjectsSelector,
  getDeveloperProjectLoading,
} from 'redux/selectors/developerProjects';
import { getDeveloperProjects } from 'redux/asyncActions/developerProjects';
import { SelectProjectFilter } from 'shared/components/SelectProjectFilter/SelectProjectFilter';
import { getSelectedDeveloper } from 'redux/selectors/timereports';
import type { DeveloperProject } from 'api/models/developerProjects';
import type { User } from 'api/models/users';
import { styles } from './styles';

export const TimeReportWorkItemsListFilters: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const users = useAppShallowSelector(getUsersSelector);
  const isUsersLoading = useAppSelector(getUsersLoading);
  const developerProjects = useAppShallowSelector(getDeveloperProjectsSelector);
  const isDeveloperProjectsLoading = useAppSelector(getDeveloperProjectLoading);
  const { id: developerId } = useAppShallowSelector(getSelectedDeveloper);

  useEffect(() => {
    if (!users.length) void dispatch(getUsers());
    if (developerId) void dispatch(getDeveloperProjects(developerId));
  }, [dispatch, developerId]);

  const changeUser = (user: object): void => {
    dispatch(selectDeveloper(user as Omit<User, 'permissions'>));
  };

  const changeDeveloperProject = (developerProject: object): void => {
    dispatch(selectProject(developerProject as DeveloperProject));
  };

  return (
    <Grid
      container
      justifyContent='flex-start'
      alignItems='center'
      mb={40}
      sx={styles}
      columnSpacing={20}
    >
      <Grid
        item
        xs={2.5}
      >
        <SkeletonWrapper
          isLoading={isUsersLoading}
          width={170}
          height={60}
          animation='wave'
        >
          {!!users?.length && (
            <Autocomplete
              options={users}
              keysToId={['id']}
              keysToName={['name']}
              onChange={changeUser}
              selectAll={false}
            />
          )}
        </SkeletonWrapper>
      </Grid>
      <Grid
        item
        xs={2.5}
      >
        <SkeletonWrapper
          isLoading={isDeveloperProjectsLoading}
          width={170}
          height={60}
          animation='wave'
        >
          {!!developerProjects.length && (
            <SelectProjectFilter
              developerProjects={developerProjects}
              onChange={changeDeveloperProject}
            />
          )}
        </SkeletonWrapper>
      </Grid>
      <Grid
        item
        xs={3}
      >
        <SelectMonth initialYear={2015} />
      </Grid>
    </Grid>
  );
};
