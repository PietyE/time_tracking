import { type FC } from 'react';
import { IconButton, Grid, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { TimeInput } from '../../../../../../shared/components/TimeInput';
import { styles } from './styles';

export const TimeReportWorkItemsListItem: FC = (): JSX.Element => (
  <Grid
    container
    component='form'
    columnSpacing={24}
    bgcolor='common.white'
    alignItems='center'
    maxWidth={971}
    borderRadius={1.5}
    sx={styles.container}
  >
    <Grid
      item
      xs={3}
      p={0}
    >
      <Typography variant='subtitle1'>Monday, 29</Typography>
    </Grid>
    <Grid
      item
      xs={7}
    >
      <TextField
        multiline
        fullWidth
      />
    </Grid>
    <Grid
      item
      xs={1.1}
    >
      <TimeInput
        value={10}
        placeholder='0:00'
        error={false}
        mask='9:99'
        maskPlaceholder='0'
      />
    </Grid>
    <Grid
      item
      xs={0.9}
    >
      <IconButton
        type='submit'
        sx={styles.button}
      >
        <CheckIcon />
      </IconButton>
    </Grid>
  </Grid>
);
