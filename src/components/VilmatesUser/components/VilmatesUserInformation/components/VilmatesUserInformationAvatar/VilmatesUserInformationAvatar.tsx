import { type FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { Avatar } from 'shared/components/Avatar';
import { SizingContainer } from 'shared/UI/SizingContainer';
import { styles } from './styles';

interface Props {
  name: string;
}

export const VilmatesUserInformationAvatar: FC<Props> = ({
  name,
}): JSX.Element => (
  <Grid
    item
    p={40}
    borderRadius={2.5}
    border={1}
    borderColor='customGrey.STROKE_OPACITY_40'
    bgcolor='common.white'
    boxShadow={1}
    sx={styles}
    component='section'
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
        {name}
      </Typography>
    </SizingContainer>
  </Grid>
);
