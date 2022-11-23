import { createBrowserRouter, Navigate } from 'react-router-dom';
import RequireAuth from 'components/RequireAuth/RequireAuth';
import { AppRoutes } from 'constants/appRoutesConstants';
import MainLayout from 'components/MainLayout';
import {
  PagesViewPermissions,
  SyncWithGoogleSheetsPermissions,
  UsersPermissions,
} from 'constants/permissions';
import LoginPage from 'pages/LoginPage';
import ProjectsReportPage from 'pages/ProjectsReportPage';

export const routes = createBrowserRouter([
  {
    path: AppRoutes.root,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to={AppRoutes.timeReport}
            replace
          />
        ),
      },
      {
        path: AppRoutes.timeReport,
        element: <h1>Time report</h1>,
      },
      {
        path: AppRoutes.projectReport,
        element: <ProjectsReportPage />,
      },
      {
        path: AppRoutes.projectManagement,
        element: (
          <RequireAuth
            permissions={[
              PagesViewPermissions.users_can_view_projectmanagement,
            ]}
          >
            <h1>Project Management</h1>
          </RequireAuth>
        ),
      },
      {
        path: AppRoutes.vilmates,
        element: (
          <RequireAuth
            permissions={[PagesViewPermissions.users_can_view_vilmates]}
          >
            <h1>Vilmates</h1>
          </RequireAuth>
        ),
      },
      {
        path: `${AppRoutes.vilmates}${AppRoutes.singlePage}/:id`,
        element: (
          <RequireAuth
            permissions={[PagesViewPermissions.users_can_view_vilmates]}
          >
            <h1>Singe Page</h1>
          </RequireAuth>
        ),
      },
      {
        path: AppRoutes.syncWithGoogleSheets,
        element: (
          <RequireAuth
            permissions={[
              SyncWithGoogleSheetsPermissions.users_can_view_syncdrive,
              SyncWithGoogleSheetsPermissions.gsheets_add_accesscredentials,
              SyncWithGoogleSheetsPermissions.gsheets_view_accesscredentials,
              UsersPermissions.users_add_user,
            ]}
          >
            <h1>Sync with gsheets</h1>
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: AppRoutes.auth,
    element: <LoginPage />,
  },
  {
    path: '*',
    element: (
      <Navigate
        to={AppRoutes.root}
        replace
      />
    ),
  },
]);