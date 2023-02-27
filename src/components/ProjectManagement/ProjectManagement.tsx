import { type FC } from 'react';
import { ManageProjectModal } from './components/ManageProjectModal';
import { ProjectManagementFilter } from './components/ProjectManagementFilter';
import { ProjectManagementHeader } from './components/ProjectManagementHeader/ProjectManagementHeader';
import { ProjectManagementTable } from './components/ProjectManagementTable';

// TODO: toje refactorit nado ( i daje mb logiku gde to menyat v filtrah i zaprohash k nim , soryan deadline (
export const ProjectManagement: FC = (): JSX.Element => (
  <>
    <ProjectManagementHeader />
    <ProjectManagementFilter />
    <ProjectManagementTable />
    <ManageProjectModal />
  </>
);
