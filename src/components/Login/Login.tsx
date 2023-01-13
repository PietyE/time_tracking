import { type FC } from 'react';
import { Stack } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { LoginSignInForm } from './components/LoginSignInForm';
// import { AutocompleteFilter } from '../../shared/components/AutocompleteFilter';
import { AppRoutes } from 'constants/appRoutesConstants';
import { useAppSelector } from 'hooks/redux';
import { getIsAuthProfileSelector } from 'redux/selectors/profile';
import LogoSvg from 'shared/components/svg/Logo';
import { styles } from './styles';

export const Login: FC = (): JSX.Element => {
  const isAuth = useAppSelector(getIsAuthProfileSelector);
  // const [value, setValue] = useState<string | string[] | null>('1');
  //
  // const handleChange = (
  //   __: SyntheticEvent,
  //   newValue: string | string[] | null,
  // ): void => {
  //   setValue(newValue);
  // };

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
      {/* <AutocompleteFilter */}
      {/*  value={value} */}
      {/*  onChange={handleChange} */}
      {/*  options={['Time tracking', 'Accumeo', 'Hitta hem']} */}
      {/* /> */}
    </Stack>
  );
};
