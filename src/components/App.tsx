import { type FC, Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { getIsLoadingProfileSelector } from '../redux/selectors/profile';
import { routes } from 'routes';
import Loading from 'shared/components/Loading';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getUserProfile } from 'redux/asyncActions/profile';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIsLoadingProfileSelector);

  useEffect(() => {
    void dispatch(getUserProfile());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
};

export default App;
