import { type FC, useEffect } from 'react';
import { titles } from './constants';
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

export const ProjectReportTable: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const consolidateReports = useAppShallowSelector(
    getConsolidatedReportSelector,
  );
  const selectedDeveloper = useAppShallowSelector(getSelectedDeveloper);
  const selectedProject = useAppShallowSelector(getSelectedProject);
  const { debouncedMonth: month, debouncedYear: year } = useDebouncedMonths();

  useEffect(() => {
    if (selectedDeveloper.id && selectedProject.id)
      void dispatch(
        getConsolidatedReport({
          month: month + 1,
          year,
        }),
      );
  }, [month, year, selectedProject, selectedDeveloper, dispatch]);

  return (
    <>
      <LoaderProjectReport />
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
        keyToRate={['is_full_time']}
        keyToHourlyPayroll={['overtime_minutes']}
      />
    </>
  );
};

const LoaderProjectReport = (): JSX.Element => {
  const isLoading = useAppSelector(getConsolidatedReportLoading);

  useScrollLock(isLoading);

  return <>{isLoading && <Loading />}</>;
};
