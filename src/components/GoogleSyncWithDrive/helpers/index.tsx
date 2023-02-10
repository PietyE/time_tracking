import { useEffect } from 'react';
import { ListItemText } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sortArrayAlphabetically } from 'shared/utils/sortArrayAlphabetically';
import { useAppDispatch } from 'hooks/redux';
import { syncWithGoogleSheetsCreateToken } from 'redux/asyncActions/syncWithGoogleSheets';
import { AppRoutes } from 'constants/appRoutesConstants';

interface ReturnType {
  state: string | null;
}

export const useGoogleDriveSync = (): ReturnType => {
  const [searchParams] = useSearchParams();
  const state = searchParams.get('state');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      void dispatch(
        syncWithGoogleSheetsCreateToken({
          state,
          callback_url: window.location.href,
        }),
      )
        .unwrap()
        .catch((error) => {
          navigate(`/${AppRoutes.projectReport}`);
          toast.error(error);
        });
    }
  }, [dispatch, state]);

  return { state };
};

export const renderUsersAndSortByName = (
  users: string[],
): JSX.Element[] | JSX.Element => {
  const newUsers = [...users];
  return newUsers.length ? (
    newUsers.sort(sortArrayAlphabetically).map((user) => (
      <ListItemText
        key={user}
        primary={user}
        primaryTypographyProps={{
          noWrap: true,
        }}
        sx={{
          maxWidth: 200,
          mb: 20,
          '&:last-child': {
            mb: 0,
          },
        }}
      />
    ))
  ) : (
    <ListItemText primary='No users' />
  );
};
