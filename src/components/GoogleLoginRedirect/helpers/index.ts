import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { userGoogleSignIn } from 'redux/asyncActions/profile';

interface ReturnType {
  state: string | null;
}

export const useGoogleAuth = (): ReturnType => {
  const [searchParams] = useSearchParams();
  const state = searchParams.get('state');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state) {
      void dispatch(
        userGoogleSignIn({
          state,
          callback_url: window.location.href,
        }),
      );
    }
  }, [dispatch, state]);

  return { state };
};
