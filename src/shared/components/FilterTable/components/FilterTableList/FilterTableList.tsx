import type { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { styles } from '../../styles';

interface Props {
  column: number;
}

export const FilterTableList: FC<Props> = ({ column }): JSX.Element => (
  <Grid
    container
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
      xs={10}
    >
      <Typography variant='subtitle1'>{`${column}name`}</Typography>
    </Grid>
    <Grid
      item
      xs={2}
    >
      <Typography variant='subtitle1'>{`${column}hours`}</Typography>
    </Grid>
  </Grid>
);
