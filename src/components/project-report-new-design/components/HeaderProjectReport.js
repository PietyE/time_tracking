import React, { } from 'react'
import { useDispatch } from 'react-redux';
import download from '../../../images/projectReportIcons/download.svg'

import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector';
import { selectProjectsByUserId } from 'selectors/project-report-details';

import {
  getTimeReportCsv,
} from 'actions/times-report'

function HeaderProjectReport (user) {
  const { id } = user;
  const dispatch = useDispatch;

  const userProjects = useShallowEqualSelector((state) => selectProjectsByUserId(state, id))

  const handlerExportCsv = () => {
    if (!userProjects || userProjects?.length === 0) {
      return
    }
    dispatch(getTimeReportCsv())
  }

  return (
    <>
      <div className="project_report_header">
        <span className="header_title">Project report</span>
        <div className="project_report_export_button">
          <img src={download} alt="download" className="export_button_img" onClick={handlerExportCsv}/>
          <span className="export_button_text">Export in XLSX</span>
        </div>
      </div>
    </>
  )
}

export default HeaderProjectReport;