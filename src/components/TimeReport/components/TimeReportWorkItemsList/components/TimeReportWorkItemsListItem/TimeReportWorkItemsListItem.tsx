import { type FC } from 'react';
import { IconButton, Grid, TextField, Typography, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { styles } from './styles';

export const TimeReportWorkItemsListItem: FC = (): JSX.Element => (
  <Box>
    <Grid
      container
      component='form'
      columnSpacing={24}
      py={16}
      px={30}
      pl={6}
      bgcolor='common.white'
      alignItems='center'
      mb={16}
      ml={0}
      maxWidth={971}
      borderRadius={1.5}
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
          fullWidth
          placeholder='What did you do ?'
        />
      </Grid>
      <Grid
        item
        xs={1.1}
      >
        <TextField placeholder='0:00' />
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
  </Box>
);
