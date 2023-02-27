import { type FC } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { parseMinToHoursAndMin } from 'shared/utils/dateOperations';
import type { ProjectsWithTotalMinutes } from 'api/models/projects';

interface Props {
  archivedProjects: ProjectsWithTotalMinutes;
}

export const ProjectManagementArchivedProjects: FC<Props> = ({
  archivedProjects,
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
      archivedProjects.map((archivedProject) => (
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
      ))}
  </Box>
);
