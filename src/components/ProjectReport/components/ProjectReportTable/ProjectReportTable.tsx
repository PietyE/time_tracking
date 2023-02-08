import { type FC, useEffect } from 'react';
import { useScrollLock } from 'hooks/useScrollLock';
import Loading from 'shared/components/Loading';
import { useDebouncedMonths } from 'hooks/useDebouncedMonths';
import {
  getSelectedProject,
  getSelectedDeveloper,
} from 'redux/selectors/projectReport';
import { FilterTable } from 'shared/components/FilterTable';
import {
  useAppDispatch,
  useAppSelector,
  useAppShallowSelector,
} from 'hooks/redux';
import { getConsolidatedReport } from 'redux/asyncActions/consolidatedReport';
import {
  getConsolidatedReport as getConsolidatedReportSelector,
  getConsolidatedReportLoading,
} from 'redux/selectors/consolidatedReport';
import type { TableTitle } from 'shared/components/FilterTable/FilterTable';

const titles: TableTitle[] = [
  {
    title: 'Name',
    shouldSort: true,
    size: 3.5,
    id: '1',
  },
  {
    title: 'Project',
    shouldSort: false,
    size: 6,
    id: '2',
  },
  {
    title: 'Hours worked',
    shouldSort: false,
    size: 2.5,
    id: '3',
  },
];

export const ProjectReportTable: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const consolidateReports = useAppShallowSelector(
    getConsolidatedReportSelector,
  );
  const selectedDeveloper = useAppShallowSelector(getSelectedDeveloper);
  const selectedProject = useAppShallowSelector(getSelectedProject);
  const { debouncedMonth: month, debouncedYear: year } = useDebouncedMonths();

  useEffect(() => {
    if (selectedDeveloper.id === 'Select All') {
      void dispatch(
        getConsolidatedReport({ search: '', month: month + 1, year }),
      );
      return;
    }
    if (selectedProject.id === 'Select All') {
      void dispatch(
        getConsolidatedReport({ search: '', month: month + 1, year }),
      );
      return;
    }
    if (selectedDeveloper.id) {
      void dispatch(
        getConsolidatedReport({
          search: selectedDeveloper.email,
          month: month + 1,
          year,
        }),
      );
      return;
    }
    if (selectedProject.id) {
      void dispatch(
        getConsolidatedReport({
          project_id: selectedProject.id,
          month: month + 1,
          year,
        }),
      );
    }
  }, [month, year, selectedProject, selectedDeveloper, dispatch]);

  return (
    <>
      <Loader />
      <FilterTable
        rows={consolidateReports}
        keyToId={['id']}
        keyToName={['name']}
        keyToMail={['email']}
        keyToTime={['total_minutes']}
        keyToDropDownValues={['developer_projects']}
        keyToDropDownValueId={['id']}
        keyToDropDownValueName={['name']}
        keyToDropDownValueTime={['total_minutes']}
        titles={titles}
        isHaveDropDown={true}
      />
    </>
  );
};

const Loader = (): JSX.Element => {
  const isLoading = useAppSelector(getConsolidatedReportLoading);

  useScrollLock(isLoading);

  return <>{isLoading && <Loading />}</>;
};
