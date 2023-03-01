import { type FC, useCallback } from 'react';
import { titles } from '../mocks';
import { ProjectManagementArchivedProjects } from '../ProjectManagementArchivedProjects';
import {
  useAppDispatch,
  useAppSelector,
  useAppShallowSelector,
} from 'hooks/redux';
import { useScrollLock } from 'hooks/useScrollLock';
import {
  getProjectAndArchivedProjects,
  getProjectManagementLoading,
} from 'redux/selectors/projectManagement';
import { openModal } from 'redux/slices/projectManagements';
import { FilterTable } from 'shared/components/FilterTable';
import Loading from 'shared/components/Loading';
import { getSelectedModelManageProject } from 'redux/asyncActions/projectManagement';

export const ProjectManagementTable: FC = (): JSX.Element => {
  const projects = useAppShallowSelector(getProjectAndArchivedProjects);
  const dispatch = useAppDispatch();

  const handleOpenProject = useCallback((id: string) => {
    void dispatch(getSelectedModelManageProject(id));
    dispatch(openModal());
  }, []);

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
        onClick={handleOpenProject}
      />
      <ProjectManagementArchivedProjects
        handleOpenProject={handleOpenProject}
        archivedProjects={projects[1]}
      />
    </>
  );
};

const ProjectManagementLoader: FC = (): JSX.Element => {
  const isLoading = useAppSelector(getProjectManagementLoading);
  useScrollLock(isLoading);

  return <>{isLoading && <Loading />}</>;
};
