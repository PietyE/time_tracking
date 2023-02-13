import { type FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { Avatar } from 'shared/components/Avatar';
import { SizingContainer } from 'shared/UI/SizingContainer';

export const VilmatesUserInformation: FC = (): JSX.Element => (
  <Grid
    container
    spacing={16}
  >
    <Grid
      item
      xs={3.75}
    >
      <Grid container>
        <Grid
          item
          p={40}
          borderRadius={2.5}
          border={1}
          borderColor='customGrey.STROKE_OPACITY_40'
          bgcolor='common.white'
          boxShadow={1}
          sx={{
            '& .MuiAvatar-root': {
              mb: 16,
            },
          }}
        >
          <SizingContainer size='small'>
            <Avatar
              size='large'
              name='Test'
            />
            <Typography
              textAlign='center'
              variant='h5'
            >
              Larov
            </Typography>
          </SizingContainer>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Grid>
    <Grid
      item
      xs={8.25}
    >
      <Grid container>
        <Grid item></Grid>
      </Grid>
    </Grid>
  </Grid>
);
