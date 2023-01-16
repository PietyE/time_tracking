import { type FC } from 'react';
import { ArrowDropUp } from '@mui/icons-material';
import { Grid, Stack, Typography } from '@mui/material';
import { styles } from './styles';
// import { ArrowDropUp } from '@mui/icons-material';

export const FilterTable: FC = (): JSX.Element => (
  <Grid
    container
    flexDirection='column'
    maxWidth={1}
    justifyContent='flex-start'
    alignItems='flex-start'
    sx={styles.mainContainer}
  >
    <Grid item>
      <Grid
        container
        justifyContent='space-between'
        alignItems='center'
        sx={styles.header}
      >
        <Grid item>
          <Grid
            container
            justifyContent='flex-start'
            alignItems='center'
          >
            <Typography
              variant='subtitle2'
              color='black.300'
              fontWeight='fontWeightBold'
            >
              Project name
            </Typography>
            <Stack>
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
            <Typography
              variant='subtitle2'
              color='black.300'
              fontWeight='fontWeightBold'
            >
              Hours worked
            </Typography>
            <Stack>
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
          border={1}
          borderColor='customGrey.STROKE_OPACITY_40'
          borderRadius={1.5}
          bgcolor='common.white'
          sx={styles.itemContainer}
        >
          <Grid
            item
            flex='1 1 auto'
            xs={10}
          >
            <Typography variant='subtitle1'>name</Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography variant='subtitle1'>hours</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  </Grid>
);
