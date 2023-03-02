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
import {
  getSelectedDeveloper,
  getSelectedProject,
} from 'redux/selectors/projectReport';
import type { Project } from 'api/models/projects';
import type { User } from 'api/models/users';
import { styles } from './styles';

export const ProjectReportFilter: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const users = useAppShallowSelector(getUsersSelector);
  const projects = useAppShallowSelector(getProjectsSelector);
  const { id: selectedProjectId } = useAppShallowSelector(getSelectedProject);
  const selectedProject = useAppShallowSelector(getSelectedProject);
  const { id: selectedDeveloperId } =
    useAppShallowSelector(getSelectedDeveloper);
  const selectedDeveloper = useAppShallowSelector(getSelectedDeveloper);
  const isUsersLoading = useAppSelector(getUsersLoading);
  const isProjectsLoading = useAppSelector(getIsProjectsLoading);

  const changeUser = (user: object): void => {
    dispatch(selectDeveloper(user as Omit<User, 'permissions'>));
  };

  const changeDeveloperProject = (developerProject: object): void => {
    dispatch(selectProject(developerProject as Project));
  };

  useEffect(() => {
    void dispatch(getProjects());
    void dispatch(getUsers());
  }, []);

  // I don`t know what is this condition it, but it is works only this way for disabling right way
  const isDisabledPeopleFilter: boolean =
    (selectedProjectId !== 'Select All' &&
      selectedDeveloperId !== 'Select All') ||
    selectedProjectId !== 'Select All';

  // I don`t know what is this condition it, but it is works only this way for disabling right way
  const isDisabledProjectFilter: boolean =
    (selectedProjectId !== 'Select All' &&
      selectedDeveloperId !== 'Select All') ||
    selectedDeveloperId !== 'Select All';

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
            sx={{
              '& .MuiInputBase-root MuiOutlinedInput-root': {
                cursor: !isDisabledPeopleFilter ? 'pointer' : 'not-allowed',
              },
              '& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root input':
                {
                  cursor: !isDisabledPeopleFilter ? 'pointer' : 'not-allowed',
                },
              '& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root .MuiAutocomplete-endAdornment .MuiButtonBase-root':
                {
                  cursor: !isDisabledPeopleFilter ? 'pointer' : 'not-allowed',
                },
            }}
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
                  disabled={isDisabledPeopleFilter}
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
            sx={{
              '& .MuiInputBase-root MuiOutlinedInput-root': {
                cursor: !isDisabledProjectFilter ? 'pointer' : 'not-allowed',
              },
              '& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root input':
                {
                  cursor: !isDisabledProjectFilter ? 'pointer' : 'not-allowed',
                },
              '& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root .MuiAutocomplete-endAdornment .MuiButtonBase-root':
                {
                  cursor: !isDisabledProjectFilter ? 'pointer' : 'not-allowed',
                },
            }}
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
                  disabled={isDisabledProjectFilter}
                  selectedValue={selectedProject}
                  label='Select project'
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
