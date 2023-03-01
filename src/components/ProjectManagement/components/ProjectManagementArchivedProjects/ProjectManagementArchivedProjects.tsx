import { type FC, type MouseEvent } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { parseMinToHoursAndMin } from 'shared/utils/dateOperations';
import type { ProjectsWithTotalMinutes } from 'api/models/projects';

interface Props {
  archivedProjects: ProjectsWithTotalMinutes;
  handleOpenProject: (id: string) => void;
}

export const ProjectManagementArchivedProjects: FC<Props> = ({
  archivedProjects,
  handleOpenProject,
}): JSX.Element => (
  <Box>
    <Divider
      textAlign='left'
      color='text.disabled'
      sx={{
        mb: 16,
      }}
    >
      <Typography
        variant='subtitle1'
        color='text.disabled'
      >
        Archive
      </Typography>
    </Divider>
    {!!archivedProjects.length &&
      archivedProjects.map((archivedProject) => {
        const handleClick = (_event: MouseEvent<HTMLDivElement>): void => {
          handleOpenProject(archivedProject.id);
        };

        return (
          <Grid
            container
            py={25}
            px={30}
            bgcolor='common.white'
            border={1}
            borderRadius={1.5}
            borderColor='text.disabled'
            mb={15}
            key={archivedProject.id}
            alignItems='center'
            justifyContent='space-between'
            onClick={handleClick}
            sx={{
              cursor: 'pointer',
            }}
          >
            <Grid item>
              <Typography
                variant='subtitle1'
                color='text.disabled'
              >
                {archivedProject.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant='body1'
                color='text.disabled'
              >
                {archivedProject.total_minutes
                  ? parseMinToHoursAndMin(archivedProject.total_minutes)
                  : '0:00'}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
  </Box>
);
