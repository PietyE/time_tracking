import { type FC, useEffect } from 'react';
import { Divider, Grid } from '@mui/material';
import { SkeletonWrapper } from 'shared/components/SkeletonWrapper';
import {
  useAppDispatch,
  useAppSelector,
  useAppShallowSelector,
} from 'hooks/redux';
import {
  getUsers as getUsersSelector,
  getUsersLoading,
} from 'redux/selectors/users';
import { SelectMonthMemoized } from 'shared/components/SelectMonth';
import { Autocomplete } from 'shared/components/Autocomplete';
import {
  getProjects as getProjectsSelector,
  getIsProjectsLoading,
} from 'redux/selectors/projects';
import { getProjects } from 'redux/asyncActions/projects';
import { getUsers } from 'redux/asyncActions/users';
import { selectDeveloper, selectProject } from 'redux/slices/projectReport';
import type { Project } from 'api/models/projects';
import type { User } from 'api/models/users';
import { styles } from './styles';

export const ProjectReportFilter: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const users = useAppShallowSelector(getUsersSelector);
  const projects = useAppShallowSelector(getProjectsSelector);
  const isUsersLoading = useAppSelector(getUsersLoading);
  const isProjectsLoading = useAppSelector(getIsProjectsLoading);

  const changeUser = (user: object): void => {
    dispatch(selectDeveloper(user as Omit<User, 'permissions'>));
  };

  const changeDeveloperProject = (developerProject: object): void => {
    dispatch(selectProject(developerProject as Project));
  };

  useEffect(() => {
    if (!projects?.length) void dispatch(getProjects());
    if (!users?.length) void dispatch(getUsers());
  }, []);

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
              {!!users?.length && (
                <Autocomplete
                  options={users}
                  keysToName={['name']}
                  keysToId={['id']}
                  onChange={changeUser}
                  selectAll
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
              {!!projects?.length && (
                <Autocomplete
                  options={projects}
                  keysToName={['name']}
                  keysToId={['id']}
                  onChange={changeDeveloperProject}
                  selectAll
                />
              )}
            </SkeletonWrapper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <SelectMonthMemoized initialYear={2015} />
      </Grid>
    </Grid>
  );
};
