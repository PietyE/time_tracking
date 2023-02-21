import { type FC } from 'react';
import { ProjectManagementFilter } from './components/ProjectManagementFilter';
import { ProjectManagementHeader } from './components/ProjectManagementHeader/ProjectManagementHeader';
import { ProjectManagementTable } from './components/ProjectManagementTable';

export const ProjectManagement: FC = (): JSX.Element => (
  <>
    <ProjectManagementHeader />
    <ProjectManagementFilter />
    <ProjectManagementTable />
  </>
);
