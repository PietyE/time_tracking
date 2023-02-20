import { type FC, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { getProjects } from 'redux/asyncActions/projects';
import { getUsers } from 'redux/asyncActions/users';
import { selectDeveloper, selectProject } from 'redux/slices/projectReport';
import { SelectMonthMemoized } from 'shared/components/SelectMonth';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import {
  getUsers as getUsersSelector,
  getUsersLoading,
} from 'redux/selectors/users';
import { SkeletonWrapper } from 'shared/components/SkeletonWrapper';
import {
  getIsProjectsLoading,
  getProjects as getProjectsSelector,
} from 'redux/selectors/projects';
import { Autocomplete } from 'shared/components/Autocomplete';
import type { User } from 'api/models/users';
import type { Project } from 'api/models/projects';

export const ProjectManagementFilter: FC = (): JSX.Element => {
  const users = useAppShallowSelector(getUsersSelector);
  const isUsersLoading = useAppShallowSelector(getUsersLoading);
  const projects = useAppShallowSelector(getProjectsSelector);
  const isProjectsLoading = useAppShallowSelector(getIsProjectsLoading);
  const dispatch = useAppDispatch();

  const changeUser = (user: object): void => {
    dispatch(selectDeveloper(user as Omit<User, 'permissions'>));
  };

  const changeDeveloperProject = (developerProject: object): void => {
    dispatch(selectProject(developerProject as Project));
  };

  useEffect(() => {
    if (!projects?.length) void dispatch(getProjects());
    if (!users?.length) void dispatch(getUsers());
  }, [dispatch]);

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
              {!!users.length && (
                <Autocomplete
                  options={users}
                  keysToName={['users']}
                  keysToId={['id']}
                  onChange={changeUser}
                />
              )}
            </SkeletonWrapper>
          </Grid>
          <SkeletonWrapper isLoading={isProjectsLoading}>
            <Grid item>
              <Autocomplete
                options={projects}
                keysToName={['name']}
                keysToId={['id']}
                onChange={changeDeveloperProject}
              />
            </Grid>
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
