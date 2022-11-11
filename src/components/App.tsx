import { type FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

import RootRoutes from 'routes/RootRoutes';
import { getUserProfile } from 'store/asyncActions/profile';
import Loading from 'components/Loading';
import { getIsLoadingProfileSelector } from 'store/reducers/profile';

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
    <>
      <RootRoutes />
    </>
  );
};

export default App;
