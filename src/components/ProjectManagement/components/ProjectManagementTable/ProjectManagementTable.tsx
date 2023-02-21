import { type FC } from 'react';
import { titles } from '../mocks';
import { FilterTable } from 'shared/components/FilterTable';
import { useAppSelector, useAppShallowSelector } from 'hooks/redux';
import {
  getProjectManagementLoading,
  getProjectsWithTotalMinutes,
} from 'redux/selectors/projectManagement';
import { useScrollLock } from 'hooks/useScrollLock';
import Loading from 'shared/components/Loading';

export const ProjectManagementTable: FC = (): JSX.Element => {
  const projects = useAppShallowSelector(getProjectsWithTotalMinutes);

  return (
    <>
      <ProjectManagementLoader />
      <FilterTable
        rows={projects}
        keyToName={['name']}
        keyToTime={['total_minutes']}
        keyToId={['id']}
        titles={titles}
        isHaveDropDown={false}
      />
    </>
  );
};

const ProjectManagementLoader: FC = (): JSX.Element => {
  const isLoading = useAppSelector(getProjectManagementLoading);
  useScrollLock(isLoading);

  return <>{isLoading && <Loading />}</>;
};
