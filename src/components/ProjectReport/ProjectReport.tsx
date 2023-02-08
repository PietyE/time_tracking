import { type FC } from 'react';
import { ProjectReportFilter } from './components/ProjectReportFilter';
import { ProjectReportHeader } from './components/ProjectReportHeader';
import { ProjectReportTable } from './components/ProjectReportTable';

export const ProjectReport: FC = (): JSX.Element => (
  <>
    <ProjectReportHeader />
    <ProjectReportFilter />
    <ProjectReportTable />
  </>
);
