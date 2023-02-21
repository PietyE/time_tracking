import { type FC } from 'react';
import { titles } from '../mocks';
import { ProjectManagementArchivedProjects } from '../ProjectManagementArchivedProjects';
import { FilterTable } from 'shared/components/FilterTable';
import { useAppSelector, useAppShallowSelector } from 'hooks/redux';
import {
  getProjectAndArchivedProjects,
  getProjectManagementLoading,
} from 'redux/selectors/projectManagement';
import { useScrollLock } from 'hooks/useScrollLock';
import Loading from 'shared/components/Loading';

export const ProjectManagementTable: FC = (): JSX.Element => {
  const projects = useAppShallowSelector(getProjectAndArchivedProjects);

  return (
    <>
      <ProjectManagementLoader />
      <FilterTable
        rows={projects[0]}
        keyToName={['name']}
        keyToTime={['total_minutes']}
        keyToId={['id']}
        titles={titles}
        isHaveDropDown={false}
      />
      <ProjectManagementArchivedProjects archivedProjects={projects[1]} />
    </>
  );
};

const ProjectManagementLoader: FC = (): JSX.Element => {
  const isLoading = useAppSelector(getProjectManagementLoading);
  useScrollLock(isLoading);

  return <>{isLoading && <Loading />}</>;
};
