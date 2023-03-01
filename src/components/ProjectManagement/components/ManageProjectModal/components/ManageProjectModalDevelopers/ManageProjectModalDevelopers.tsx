import { type FC, useState } from 'react';
import Delete from '@mui/icons-material/Delete';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { AddDevelopers } from './AddDevelopers';
import { DeveloperList } from './DeveloperList';
import { sortArrayAlphabetically } from '../../../../../../shared/utils/sortArrayAlphabetically';
import { DeveloperOccupationRadioGroup } from 'components/VilmatesUser/components/VilmatesUserInformation/components/VilmatesUserInformationProjects/DeveloperOccupationRadioGroup';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import {
  getReportExcel,
  updateDeveloperProject,
} from 'redux/asyncActions/projectManagement';
import { getManageModalReports } from 'redux/selectors/projectManagement';
import { Avatar } from 'shared/components/Avatar';
import { Export } from 'shared/components/svg/Export';
import { parseMinToHoursAndMin } from 'shared/utils/dateOperations';
// tak toje delat nelzya , eto drugoi modul :) , eh deadline, move it to shared component please

export const ManageProjectModalDevelopers: FC = (): JSX.Element => {
  const reports = useAppShallowSelector(getManageModalReports);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => setOpen(true);

  const handleClose = (): void => setOpen(false);

  return (
    <Box position='relative'>
      {!!reports?.length && (
        <Box
          sx={{
            maxHeight: 200,
            overflowY: 'auto',
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
            .sort((report1, report2) =>
              sortArrayAlphabetically(report1.user.name, report2.user.name),
            )
            .map((report) => {
              const onChangeOccupation = (newOccupation: boolean): void => {
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

              const exportExcel = (): void => {
                void dispatch(getReportExcel(report.id));
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
                      {report.is_full_time ? 'Salary' : ' Hourly payroll'}
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
                      <IconButton onClick={onDeleteProject}>
                        <Delete sx={{ mr: 10, display: 'none' }} />
                      </IconButton>
                      <IconButton onClick={exportExcel}>
                        <Export />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              );
            })}
        </Box>
      )}
      {open && <DeveloperList handleClose={handleClose} />}
      <AddDevelopers handleOpen={handleOpen} />
    </Box>
  );
};
