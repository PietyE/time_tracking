import { type FC, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import {
  useAppDispatch,
  useAppSelector,
  useAppShallowSelector,
} from 'hooks/redux';
import { getDeveloperProjects } from 'redux/asyncActions/developerProjects';
import { getReportExcel } from 'redux/asyncActions/timereports';
import { getUsers } from 'redux/asyncActions/users';
import {
  getDeveloperProjectLoading,
  getOnlyActiveProject,
} from 'redux/selectors/developerProjects';
import { getSelectedDeveloper } from 'redux/selectors/timereports';
import {
  getUsers as getUsersSelector,
  getUsersLoading,
} from 'redux/selectors/users';
import { selectDeveloper, selectProject } from 'redux/slices/timereports';
import { Autocomplete } from 'shared/components/Autocomplete';
import { SelectMonthMemoized } from 'shared/components/SelectMonth';
import { SelectProjectFilter } from 'shared/components/SelectProjectFilter/SelectProjectFilter';
import { SkeletonWrapper } from 'shared/components/SkeletonWrapper';
import type { User } from 'api/models/users';
import type { DeveloperProject } from 'api/models/developerProjects';
import { styles } from './styles';

export const TimeReportWorkItemsListFilters: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const users = useAppShallowSelector(getUsersSelector);
  const isUsersLoading = useAppSelector(getUsersLoading);
  const developerProjects = useAppShallowSelector(getOnlyActiveProject);
  const isDeveloperProjectsLoading = useAppSelector(getDeveloperProjectLoading);
  const { id: developerId } = useAppShallowSelector(getSelectedDeveloper);

  useEffect(() => {
    if (!users?.length) void dispatch(getUsers());
    if (developerId) void dispatch(getDeveloperProjects(developerId));
  }, [dispatch, developerId]);

  const changeUser = (user: object): void => {
    dispatch(selectDeveloper(user as Omit<User, 'permissions'>));
  };

  const changeDeveloperProject = (developerProject: object): void => {
    dispatch(selectProject(developerProject as DeveloperProject));
  };

  const handleExportCsv = (): void => {
    void dispatch(getReportExcel());
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
              label='Select user'
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
              label='Select project'
            />
          )}
        </SkeletonWrapper>
      </Grid>
      <Grid
        item
        xs={3}
      >
        <SelectMonthMemoized initialYear={2015} />
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          startIcon={<DownloadIcon />}
          onClick={handleExportCsv}
        >
          Export in XLSX
        </Button>
      </Grid>
    </Grid>
  );
};
