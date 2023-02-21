import { type FC, useEffect } from 'react';
import { Box, Divider, Grid } from '@mui/material';
import { getUsers } from 'redux/asyncActions/users';
import {
  selectDeveloper,
  selectProject,
} from 'redux/slices/projectManagements';
import { SelectMonthMemoized } from 'shared/components/SelectMonth';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import {
  getUsers as getUsersSelector,
  getUsersLoading,
} from 'redux/selectors/users';
import { SkeletonWrapper } from 'shared/components/SkeletonWrapper';
import {
  getProjectManagementLoading,
  getProjectsWithTotalMinutes as getProjectsSelector,
  getSelectedDeveloper,
} from 'redux/selectors/projectManagement';
import { Autocomplete } from 'shared/components/Autocomplete';
import { getProjectManagementProject } from 'redux/asyncActions/projectManagement';
import type { User } from 'api/models/users';
import type { ProjectWithTotalMinutes } from 'api/models/projects';
import { styles } from './styles';

export const ProjectManagementFilter: FC = (): JSX.Element => {
  const users = useAppShallowSelector(getUsersSelector);
  const isUsersLoading = useAppShallowSelector(getUsersLoading);
  const projects = useAppShallowSelector(getProjectsSelector);
  const isProjectsLoading = useAppShallowSelector(getProjectManagementLoading);
  const selectedDeveloper = useAppShallowSelector(getSelectedDeveloper);
  const dispatch = useAppDispatch();

  const changeUser = (user: object): void => {
    dispatch(selectDeveloper(user as Omit<User, 'permissions'>));
  };

  const changeDeveloperProject = (developerProject: object): void => {
    dispatch(selectProject(developerProject as ProjectWithTotalMinutes));
  };

  useEffect(() => {
    void dispatch(
      getProjectManagementProject({ user_id: selectedDeveloper.id }),
    );

    if (!users?.length) void dispatch(getUsers());
  }, [dispatch, selectedDeveloper.id]);

  return (
    <Grid
      container
      justifyContent='space-between'
      alignItems='center'
      mb={40}
    >
      <Grid
        item
        xs={5}
      >
        <Grid
          container
          alignItems='center'
          justifyContent='flex-start'
        >
          <Grid
            item
            xs={5}
          >
            <SkeletonWrapper
              isLoading={isUsersLoading}
              width={170}
              height={60}
              animation='wave'
            >
              {!!users.length && (
                <Autocomplete
                  options={users}
                  keysToName={['name']}
                  keysToId={['id']}
                  selectAll
                  onChange={changeUser}
                />
              )}
            </SkeletonWrapper>
          </Grid>
          <Grid
            item
            xs={1.5}
            alignSelf='center'
          >
            <Divider sx={styles} />
          </Grid>
          <Grid
            item
            xs={5}
          >
            <SkeletonWrapper
              isLoading={isProjectsLoading}
              width={170}
              height={60}
              animation='wave'
            >
              <Grid item>
                {!!projects.length && (
                  <Autocomplete
                    options={projects}
                    keysToName={['name']}
                    keysToId={['id']}
                    selectAll
                    onChange={changeDeveloperProject}
                  />
                )}
              </Grid>
            </SkeletonWrapper>
          </Grid>
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
