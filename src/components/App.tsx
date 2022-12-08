import { type FC, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from 'routes';
import Loading from 'shared/components/Loading';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import { getUserProfile } from 'redux/asyncActions/profile';
import { getIsLoadingProfileSelector } from 'redux/slices/profile';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppShallowSelector(getIsLoadingProfileSelector);

  useEffect(() => {
    void dispatch(getUserProfile());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return <RouterProvider router={routes} />;
};

export default App;
