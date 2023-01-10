import { type FC, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { LoginSignInForm } from './components/LoginSignInForm';
import { Autocomplete } from '../../shared/components/Autocomplete';
import { getIsAuthProfileSelector } from 'redux/selectors/profile';
import { AppRoutes } from 'constants/appRoutesConstants';
import { useAppSelector } from 'hooks/redux';
import LogoSvg from 'shared/components/svg/Logo';
import { styles } from './styles';

export const Login: FC = (): JSX.Element => {
  const isAuth = useAppSelector(getIsAuthProfileSelector);
  const [value, setValue] = useState('1');

  if (isAuth) {
    return (
      <Navigate
        to={AppRoutes.root}
        replace
      />
    );
  }

  return (
    <Stack
      component='section'
      width='auto'
      height='100vh'
      alignItems='center'
      sx={styles.container}
    >
      <LogoSvg />
      <LoginSignInForm />
      <Autocomplete
        options={['1', '2', '3']}
        value={value}
        renderInput={(params) => (
          // @ts-expect-error
          <TextField
            {...params}
            label='Search input'
            InputProps={{ ...params.InputProps }}
            variant='outlined'
          />
        )}
        onChange={(newValue) => {
          setValue(newValue);
          console.log(event);
        }}
      />
    </Stack>
  );
};
