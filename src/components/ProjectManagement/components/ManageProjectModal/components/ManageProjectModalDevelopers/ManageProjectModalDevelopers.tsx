import { type FC } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import { AddDevelopers } from './AddDevelopers';
import { parseMinToHoursAndMin } from '../../../../../../shared/utils/dateOperations';
import { updateDeveloperProject } from 'redux/asyncActions/projectManagement';
// tak toje delat nelzya , eto drugoi modul :) , eh deadline, move it to shared component please
import { DeveloperOccupationRadioGroup } from 'components/VilmatesUser/components/VilmatesUserInformation/components/VilmatesUserInformationProjects/DeveloperOccupationRadioGroup';
import { Avatar } from 'shared/components/Avatar';
import { Export } from 'shared/components/svg/Export';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import { getManageModalReports } from 'redux/selectors/projectManagement';

export const ManageProjectModalDevelopers: FC = (): JSX.Element => {
  const reports = useAppShallowSelector(getManageModalReports);
  const dispatch = useAppDispatch();

  return (
    <>
      {!!reports?.length && (
        <Box
          sx={{
            '& .MuiFormGroup-root': {
              display: 'none',
            },
            '& .project_management_manage_modal_list_occupation_label': {
              display: 'block',
            },
            '& :hover': {
              '& .MuiSvgIcon-root': {
                display: 'inline-block',
              },
              '& .MuiFormGroup-root': {
                display: 'flex',
              },
              '& .project_management_manage_modal_list_occupation_label': {
                display: 'none',
              },
            },
          }}
        >
          {reports
            .filter((report) => report.is_active)
            .map((report) => {
              const onChangeOccupation = (newOccupation: boolean): void => {
                console.log('occ', newOccupation);
                void dispatch(
                  updateDeveloperProject({
                    developerProjectId: report.id,
                    updatedData: { is_full_time: newOccupation },
                  }),
                );
              };

              const onDeleteProject = (): void => {
                void dispatch(
                  updateDeveloperProject({
                    developerProjectId: report.id,
                    updatedData: { is_active: false },
                  }),
                );
              };

              return (
                <Grid
                  container
                  key={report.id}
                  px={26}
                  py={20}
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Grid
                    item
                    mr={15}
                    xs={4.3}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyItems='flex-start'
                    >
                      <Avatar
                        size='extraSmall'
                        name={report.user.name}
                      />
                      <Typography
                        ml={10}
                        noWrap
                      >
                        {report.user.name}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    flex='1 1 auto'
                  >
                    <Typography className='project_management_manage_modal_list_occupation_label'>
                      Salary
                    </Typography>
                    <DeveloperOccupationRadioGroup
                      isFullTime={report.is_full_time}
                      onChange={onChangeOccupation}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>
                      {parseMinToHoursAndMin(report.total_minutes)}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1.3}
                    ml={20}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='flex-start'
                      sx={{
                        '& svg': {
                          cursor: 'pointer',
                        },
                      }}
                    >
                      <IconButton>
                        <Delete
                          sx={{ mr: 10, display: 'none' }}
                          onClick={onDeleteProject}
                        />
                      </IconButton>
                      <IconButton>
                        <Export />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              );
            })}
        </Box>
      )}
      <AddDevelopers />
    </>
  );
};
