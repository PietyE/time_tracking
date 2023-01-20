import { type FC, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { userGoogleSignIn } from 'redux/asyncActions/profile';
import { getIsAuthProfileSelector } from 'redux/selectors/profile';
import { AppRoutes } from 'constants/appRoutesConstants';
import Loading from 'shared/components/Loading';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

export const GoogleLoginRedirectPage: FC = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuthProfileSelector);

  useEffect(() => {
    if (state && !error) {
      void dispatch(
        userGoogleSignIn({
          state,
          callback_url: window.location.href.replace('http', 'https'),
        }),
      );
    }
  }, [dispatch, error, state]);

  if (error)
    return (
      <Navigate
        to={`/${AppRoutes.auth}`}
        replace
        state={{ googleAuth: 'access_denied' }}
      />
    );

  if (!state)
    return (
      <Navigate
        to={`/${AppRoutes.auth}`}
        replace
      />
    );

  if (isAuth)
    return (
      <Navigate
        to={AppRoutes.root}
        replace
      />
    );

  return <Loading />;
};
