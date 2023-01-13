import { type FC } from 'react';
import { ArrowDropUp } from '@mui/icons-material';
import { Grid, Stack, Typography } from '@mui/material';
// import { ArrowDropUp } from '@mui/icons-material';

export const FilterTable: FC = (): JSX.Element => (
  <Grid
    container
    flexDirection='column'
    maxWidth={1}
    justifyContent='flex-start'
    alignItems='flex-start'
    sx={{
      '& > .MuiGrid-item': {
        width: '100%',
      },
    }}
  >
    <Grid item>
      <Grid
        container
        justifyContent='space-between'
        alignItems='center'
      >
        <Grid item>
          <Grid
            container
            justifyContent='flex-start'
            alignItems='center'
          >
            <Typography>Project name</Typography>
            <Stack
              sx={{
                '& svg:last-child': {
                  transform: 'rotate(180deg)',
                },
              }}
            >
              <ArrowDropUp />
              <ArrowDropUp />
            </Stack>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            justifyContent='flex-start'
            alignItems='center'
          >
            <Typography>Hours worked</Typography>
            <Stack
              sx={{
                '& svg:last-child': {
                  transform: 'rotate(180deg)',
                },
              }}
            >
              <ArrowDropUp />
              <ArrowDropUp />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      {[1, 2, 3].map((column) => (
        <Grid
          container
          key={column}
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item>name</Grid>
          <Grid item>hours</Grid>
        </Grid>
      ))}
    </Grid>
  </Grid>
);
