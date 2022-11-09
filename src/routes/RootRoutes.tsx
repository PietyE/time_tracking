import type { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AppRoutes } from 'constants/appRoutesConstants';
import { useAppSelector } from 'hooks/redux';
import { getIsAuthProfileSelector } from 'store/reducers/profile';

import RequireAuth from 'components/RequireAuth';
import MainLayout from 'components/MainLayout';
import LoginPage from 'pages/LoginPage';
import ProjectsReportPage from 'pages/ProjectsReportPage';

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
            path={AppRoutes.vilmates}
            element={
              <RequireAuth>
                <h1>Vilmates</h1>
              </RequireAuth>
            }
          />
          <Route
            path={`${AppRoutes.vilmates}${AppRoutes.singlePage}/:id`}
            element={
              <RequireAuth>
                <h1>Single page</h1>
              </RequireAuth>
            }
          />
          <Route
            path={AppRoutes.syncWithGoogleSheets}
            element={
              <RequireAuth>
                <h1>Sync with google sheet</h1>
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
