import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import EmployeesMainComponent from 'components/in-house-employees/components/EmployeesMainComponent/EmployeesMainComponent';
import { getDevelopersProjectInProjectReport } from 'actions/projects-report';

import './remoteContractors.scss'

function RemoteContractors () {

    const dispatch = useDispatch();

    const getDevelopersProjects = useCallback(() => {
        dispatch(getDevelopersProjectInProjectReport())
    }, [dispatch])

    useEffect(() => {
        getDevelopersProjects()
      }, [getDevelopersProjects])
  
  return (
    <EmployeesMainComponent getDevelopersProjects={getDevelopersProjects} pageName="Remote contractors"/>
  )
}

export default RemoteContractors;