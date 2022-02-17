import React, { useCallback, useEffect, useState } from 'react'
import SelectMonth from '../ui/select-month'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllProjectsSelector,
  getSelectedDateForPMSelector,
  getSelectedMonthForPMSelector,
  getIsFetchingPmPageSelector,
  getIsShowEditModalSelector,
  getIsShowCreateModalSelector,
  getProjectManagerListSelector,
  getSelectedPmSelector,
  getIsShowCreateUserModalSelector,
  getSelectedProjectSelector
} from '../../reducers/projects-management'
import {
  changeSelectedDateProjectsManagement,
  clearPmProjects,
  getAllProjects,
  setSelectedProjectId,
  setShowCreateModal,
  setShowEditModal,
  setPm,
  setShownProject,
  getProjectReportById,
  setShowCreateUserModal,
  setSelectedProject
} from '../../actions/projects-management'

import './style.scss'
import SpinnerStyled from '../ui/spinner'
import Select from '../ui/select'
import { getCurrentUserSelector } from '../../reducers/profile'
import { isEmpty } from 'lodash'
import ReportItemProject from '../common/repott-item/ReportItemProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import EditProjectModal2 from './components/EditProjectModal2'
import useEqualSelector from '../../custom-hook/useEqualSelector'
import CreateProjectModal3 from './components/CreateProjectModal3'
import CreateUserModal from './components/CreateUserModal'
import { currentItemsGets, sortArrayWithObj } from '../../utils/common'
// // The pagination is commented out until the next iteration
// import { setCurrentItems, setPageSize } from '../../actions/pagination'
// import {
 //   getCurrentItems,
//   getCurrentPage,
//   getPageSize,
// } from '../../selectors/pagination'
// import Pagination from '../ui/pagination/Pagination'
// // The pagination is commented out until the next iteration

const ProjectManagementComponent = () => {
  const [projectsForManagement, setProjectsForManagement] = useState([])
  const [maxNameFilter, setMaxNameFilter] = useState(false)
  const [maxTimeFilter, setMaxTimeFilter] = useState(false)
  const dispatch = useDispatch()

  let selectedDateForPM = useEqualSelector(getSelectedDateForPMSelector)
  let isFetching = useEqualSelector(getIsFetchingPmPageSelector)
  let month = useEqualSelector(getSelectedMonthForPMSelector)
  let isEditModalShow = useEqualSelector(getIsShowEditModalSelector)
  let isCreateModalShow = useEqualSelector(getIsShowCreateModalSelector)
  let isShowCreateUserModal = useEqualSelector(getIsShowCreateUserModalSelector)
  let selectedPm = useEqualSelector(getSelectedPmSelector)
  let currentPm = useEqualSelector(getCurrentUserSelector)
  const projects = useEqualSelector(getAllProjectsSelector)
  const projectManagers = useEqualSelector(getProjectManagerListSelector)
  const selectedProject = useEqualSelector(getSelectedProjectSelector)
  // // The pagination is commented out until the next iteration
  // let currentPage = useEqualSelector(getCurrentPage)
  // let currentItems = useEqualSelector(getCurrentItems)
  // let pageSize = useEqualSelector(getPageSize)
  // let totalCount = p.length || 0
//  const PAGE_SIZE_LIMIT = 10
  // // The pagination is commented out until the next iteration

  const projectList = [
    {
      id:0,
      name:'Select all',
    },
    ...projects
  ]

  const projectManagerSelectList = [
    {
      email: '',
      id: 'select-all',
      name: 'Select All',
      role: null,
    },
    ...projectManagers,
  ]

  useEffect(() => {
    // // The pagination is commented out until the next iteration
    // dispatch(setPageSize(PAGE_SIZE_LIMIT))
  }, [])

  useEffect(() => {
    dispatch(clearPmProjects())
    dispatch(getAllProjects())
  }, [month])

  useEffect(() => {
    setProjectsForManagement(projects)
  }, [projects])


  useEffect(() => {
    if (selectedProject.id) {
      const currentProject = projectList.filter((item) => {
        return item.id === selectedProject.id
        })
      if (currentProject.length) {
        onSelectProject(currentProject) 
        setProjectsForManagement(currentProject)
        }
    }
  }, [selectedProject, projectList])

  // // The pagination is commented out until the next iteration
  // useEffect(() => {
  //   let items = currentItemsGets(pageSize, currentPage, p)
  //   dispatch(setCurrentItems(items))
  // }, [pageSize, currentPage, p])
  // // The pagination is commented out until the next iteration

  const _setSelectedProjectId = useCallback(
    (data) => {
      dispatch(setSelectedProjectId(data))
    },
    [dispatch]
  )
  const openEditModal = (id) => {
    _setSelectedProjectId(id)
    dispatch(setShowEditModal(true))
  }

  const showTypeProject = (item) => {
    if (item.name == 'Active') {
      let activeP = projects.filter((e) => e.isActive == true)
      setProjectsForManagement(activeP)
    } else {
      setProjectsForManagement([])
    }
  }

  const projectsList = projectsForManagement.map((e) => {
    return <ReportItemProject key={e.id} p={e} openEditModal={openEditModal} />
  })
  
    
  
  const _changeSelectedDateProjectsManagement = useCallback(
    (data) => {
      dispatch(changeSelectedDateProjectsManagement(data))
    },
    [dispatch]
  )

  const onSelectPm = (data) => {
    dispatch(setPm(data))
    dispatch(setShownProject(null))
    dispatch(getAllProjects())
    dispatch(setSelectedProject(projectList[0]))
  }

  const onSelectProject = (data) => {
    if(data.id ==='0'){
      dispatch(setShownProject({}))
    }else {
      dispatch(setShownProject(data))
    }
    dispatch(setSelectedProject(data))
  }

  const setSortedArr = useCallback((reverse = false, criteria) => {
    let res = sortArrayWithObj(criteria, projects, reverse)
    setProjectsForManagement(res)
  })

  return (
    <div className="project">
      <div className="container">
        <h1 className="page-title">
          <span>Project management</span>
          <div className="buttons-cont">
            <button
              type="submit"
              className={
                'btn btn-add-new mr-4 ' +
                (isShowCreateUserModal || isCreateModalShow ? '' : 'user')
              }
              onClick={() => dispatch(setShowCreateUserModal(true))}
            >
              Add new user
            </button>
            <button
              type="submit"
              className="btn btn-add-new  "
              onClick={() => dispatch(setShowCreateModal(true))}
            >
              Add new project
            </button>
          </div>
        </h1>
      </div>
      {isFetching && <SpinnerStyled />}
      <div className="container ">
        <div className="row  container__selects">
          <div className='container__selects-progects__fields'>
            <Select
              title="Search by PM or developer"
              listItems={projectManagerSelectList}
              onSelected={onSelectPm}
              valueKey="name"
              idKey="id"
              extraClassContainer={' search search-manger'}
              initialChoice={selectedPm || currentPm}
              isSearch
            />
            <Select
              title={'Choose project'}
              listItems={projectList}
              onSelected={onSelectProject}
              valueKey="name"
              idKey="id"
              extraClassContainer={'project_select project_select'}
              // onClear={clearSelectedProject}
              disabled={!projects?.length}
              initialChoice={selectedProject}
              isSearch
            />
          </div>
          <SelectMonth
            extraClassNameContainer={'month_select'}
            selectedDate={selectedDateForPM}
            setNewData={_changeSelectedDateProjectsManagement}
            showYear="true"
          />
        </div>
        <div className="row table__titles">
          <div className="col-lg-8">
            <div className="sort-by table__titles-sort__container">
              <div className="sort-title">PROJECT NAME</div>
              <div className="cart-cont">
                <div
                  className={'max ' + (maxNameFilter ? 'disable' : '')}
                  onClick={() => {
                    setSortedArr(true, 'name')
                    setMaxNameFilter(true)
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    color="#414141"
                    className="icon pencil_icon"
                  />
                </div>
                <div
                  className={'min ' + (!maxNameFilter ? 'disable' : '')}
                  onClick={() => {
                    setSortedArr(false, 'name')
                    setMaxNameFilter(false)
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    color="#414141"
                    className="icon pencil_icon"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 table__titles-sort__container">
            <div className="sort-by">
              <div className="sort-title">HOURS WORKED</div>
              <div className="cart-cont">
                <div
                  className={'max ' + (maxTimeFilter ? 'disable' : '')}
                  onClick={() => {
                    setSortedArr(true, 'total_minutes')
                    setMaxTimeFilter(true)
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    color="#414141"
                    className="icon pencil_icon"
                  />
                </div>
                <div
                  className={'min ' + (!maxTimeFilter ? 'disable' : '')}
                  onClick={() => {
                    setSortedArr(false, 'total_minutes')
                    setMaxTimeFilter(false)
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    color="#414141"
                    className="icon pencil_icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {projectsList}
        {/* The pagination is commented out until the next iteration */}
        {/* <Pagination
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          paginationDeiplayed={5}
        /> */}
        {/* The pagination is commented out until the next iteration */}
      </div>
      <CreateProjectModal3 show={isCreateModalShow} />
      <CreateUserModal show={isShowCreateUserModal} e={projectManagers} />
      <EditProjectModal2 show={isEditModalShow} />
    </div>
  )
}

export default ProjectManagementComponent
