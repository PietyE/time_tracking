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
  getProjectAndArchivedProjects,
  // getProjectManagementLoading,
  getSelectedDeveloper,
  getSelectedProject as getSelectedProjectSelector,
} from 'redux/selectors/projectManagement';
import { Autocomplete } from 'shared/components/Autocomplete';
import {
  getProjectManagementProject,
  getSelectedProjectInModal,
} from 'redux/asyncActions/projectManagement';
import { useDebouncedMonths } from 'hooks/useDebouncedMonths';
import type { User } from 'api/models/users';
import type { ProjectWithTotalMinutes } from 'api/models/projects';
import { styles } from './styles';

export const ProjectManagementFilter: FC = (): JSX.Element => {
  const users = useAppShallowSelector(getUsersSelector);
  const isUsersLoading = useAppShallowSelector(getUsersLoading);
  const projects = useAppShallowSelector(getProjectAndArchivedProjects);
  // const isProjectsLoading = useAppShallowSelector(getProjectManagementLoading);
  const selectedDeveloper = useAppShallowSelector(getSelectedDeveloper);
  const selectedProject = useAppShallowSelector(getSelectedProjectSelector);
  const dispatch = useAppDispatch();
  const { debouncedYear, debouncedMonth } = useDebouncedMonths();

  const changeUser = (user: object): void => {
    dispatch(selectDeveloper(user as Omit<User, 'permissions'>));
  };

  useEffect(() => {
    void dispatch(
      getSelectedProjectInModal({
        project_id: selectedProject.id,
      }),
    );
  }, [selectedProject.id]);

  const changeDeveloperProject = (developerProject: object): void => {
    dispatch(selectProject(developerProject as ProjectWithTotalMinutes));
  };

  useEffect(() => {
    void dispatch(
      getProjectManagementProject({ user_id: selectedDeveloper.id }),
    );

    void dispatch(getUsers());
  }, [dispatch, selectedDeveloper.id, debouncedYear, debouncedMonth]);

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
                  selectedValue={selectedDeveloper}
                  label='Select user'
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
            <Grid item>
              {!!projects[0].length && (
                <Autocomplete
                  options={projects[0]}
                  keysToName={['name']}
                  keysToId={['id']}
                  selectAll
                  onChange={changeDeveloperProject}
                  selectedValue={selectedProject}
                  label='Select project'
                />
              )}
            </Grid>
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
