import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import EmployeesMainComponent from './components/EmployeesMainComponent/EmployeesMainComponent';
import { getDevelopersProjectInProjectReport } from 'actions/projects-report';

import './inHouseEmployees.scss'

function InHouseEmployees () {

    const dispatch = useDispatch();

    const getDevelopersProjects = useCallback(() => {
        dispatch(getDevelopersProjectInProjectReport())
    }, [dispatch])

    useEffect(() => {
        getDevelopersProjects()
      }, [getDevelopersProjects])
  
  return (
    <EmployeesMainComponent getDevelopersProjects={getDevelopersProjects} pageName="In-house-employees"/>
  )
}

export default InHouseEmployees;