import { type FC } from 'react';
import { ProjectReportFilter } from './components/ProjectReportFilter';
import { ProjectReportHeader } from './components/ProjectReportHeader';
import { ProjectReportTable } from './components/ProjectReportTable';

// TODO: Check memo

export const ProjectReport: FC = (): JSX.Element => (
  <>
    <ProjectReportHeader />
    <ProjectReportFilter />
    <ProjectReportTable />
  </>
);
