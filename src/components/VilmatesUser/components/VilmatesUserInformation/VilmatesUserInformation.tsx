import { type FC, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { VilmatesUserInformationAvatar } from './components/VilmatesUserInformationAvatar';
import { VilmatesUserInformationPersonal } from './components/VilmatesUserInformationPersonal';
import { VilmatesUserInformationProjects } from './components/VilmatesUserInformationProjects';
import { usePersonalInformation } from './helpers';
import { AppRoutes } from 'constants/appRoutesConstants';
import { UsersPermissions } from 'constants/permissions';
import {
  getProfilePermissionsSelector,
  getProfileUserIdSelector,
} from 'redux/selectors/profile';
import { getSelectedVilmatesUser } from 'redux/asyncActions/vilmateSinglePage';
import {
  getIsLoadingVilmateSinglePage,
  getSelectedUserVilmateSinglePage,
} from 'redux/selectors/vilmateSinglePage';
import { useScrollLock } from 'hooks/useScrollLock';
import Loading from 'shared/components/Loading';
import {
  useAppDispatch,
  useAppSelector,
  useAppShallowSelector,
} from 'hooks/redux';
export const VilmatesUserInformation: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id: userId } = useParams<{ id: string }>();
  const id = useAppSelector(getProfileUserIdSelector);
  const currentUser = useAppShallowSelector(getSelectedUserVilmateSinglePage);
  const permissions = useAppShallowSelector(getProfilePermissionsSelector);
  const navigate = useNavigate();
  const {
    fields,
    editingState,
    errorsState,
    setErrorsState,
    setIsEditingState,
    updateUserPersonalInformation,
    actualPersonalInformation,
  } = usePersonalInformation(currentUser);

  useEffect(() => {
    if (permissions?.includes(UsersPermissions.users_view_user)) {
      if (userId) {
        void dispatch(getSelectedVilmatesUser(userId));
      }
    } else if (userId === id) void dispatch(getSelectedVilmatesUser(id));
    else navigate(`/${AppRoutes.vilmates}`);
  }, [dispatch, id, navigate, permissions, userId]);

  return (
    <>
      <SinglePageLoader />
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
              flex='1 1 auto'
              mb={32}
            >
              <VilmatesUserInformationAvatar name={currentUser.name} />
            </Grid>
            <Grid
              item
              flex='1 1 auto'
            >
              <VilmatesUserInformationProjects />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={8.25}
        >
          <Grid container>
            <Grid item>
              <VilmatesUserInformationPersonal
                fields={fields}
                actualPersonalInformation={actualPersonalInformation}
                updateUserPersonalInformation={updateUserPersonalInformation}
                editingState={editingState}
                setIsEditingState={setIsEditingState}
                errorsState={errorsState}
                setErrorState={setErrorsState}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const SinglePageLoader: FC = (): JSX.Element => {
  const isLoading = useAppShallowSelector(getIsLoadingVilmateSinglePage);
  useScrollLock(isLoading);

  return <>{isLoading && <Loading />}</>;
};
