import { type FC } from 'react';
import { ProjectReportFilter } from './components/ProjectReportFilter';
import { ProjectReportHeader } from './components/ProjectReportHeader';

export const ProjectReport: FC = (): JSX.Element => (
  <>
    <ProjectReportHeader />
    <ProjectReportFilter />
  </>
);
