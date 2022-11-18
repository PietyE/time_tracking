import type { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from 'components/MainLayout';
import { getIsAuthProfileSelector } from 'store/reducers/profile';
import LoginPage from 'pages/LoginPage';
import { useAppSelector } from 'hooks/redux';
import ProjectsReportPage from 'pages/ProjectsReportPage';
import RequireAuth from 'components/RequireAuth';
import { AppRoutes } from 'constants/appRoutesConstants';
import {
  PagesViewPermissions,
  SyncWithGoogleSheetsPermissions,
  UsersPermissions,
} from 'constants/permissions';

const RootRoutes: FC = () => {
  const isAuth = useAppSelector(getIsAuthProfileSelector);

  return (
    <Routes>
      <Route path={AppRoutes.root}>
        <Route
          element={
            isAuth ? (
              <MainLayout />
            ) : (
              <Navigate
                to={AppRoutes.auth}
                replace
              />
            )
          }
        >
          <Route
            index
            element={
              <Navigate
                to={AppRoutes.timeReport}
                replace
              />
            }
          />
          <Route
            path={AppRoutes.timeReport}
            element={
              <RequireAuth>
                <h1>Time Report</h1>
              </RequireAuth>
            }
          />
          <Route
            path={AppRoutes.projectReport}
            element={
              <RequireAuth>
                <ProjectsReportPage />
              </RequireAuth>
            }
          />
          <Route
            path={AppRoutes.vilmates}
            element={
              <RequireAuth
                permissions={[PagesViewPermissions.users_can_view_vilmates]}
              >
                <h1>Vilmates</h1>
              </RequireAuth>
            }
          />
          <Route
            path={`${AppRoutes.vilmates}${AppRoutes.singlePage}/:id`}
            element={
              <RequireAuth
                permissions={[PagesViewPermissions.users_can_view_vilmates]}
              >
                <h1>Single page</h1>
              </RequireAuth>
            }
          />
          <Route
            path={AppRoutes.projectManagement}
            element={
              <RequireAuth
                permissions={[
                  PagesViewPermissions.users_can_view_projectmanagement,
                ]}
              >
                <h1>Project Management</h1>
              </RequireAuth>
            }
          />
          <Route
            path={AppRoutes.syncWithGoogleSheets}
            element={
              <RequireAuth
                permissions={[
                  SyncWithGoogleSheetsPermissions.users_can_view_syncdrive,
                  SyncWithGoogleSheetsPermissions.gsheets_add_accesscredentials,
                  SyncWithGoogleSheetsPermissions.gsheets_view_accesscredentials,
                  UsersPermissions.users_add_user,
                ]}
              >
                <h1>Sync with google sheet</h1>
              </RequireAuth>
            }
          />
        </Route>
        <Route
          path={AppRoutes.auth}
          element={<LoginPage />}
        />
        <Route
          path='*'
          element={
            <Navigate
              to={AppRoutes.root}
              replace
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default RootRoutes;
