import React, { useCallback, useEffect, useState, useMemo } from 'react'
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
  getSelectedProjectSelector,
  getFilteredProjectSelector,
  getActivePmInCurrentProjectSelector
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
import useSorting from '../../custom-hook/useSorting'
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
  const { sorting, handleSortingChange } = useSorting()
  const [sortParams, setSortParams] = useState({
    name: true,
    total_minutes: null,
  })
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
  const filteredProjects = useEqualSelector(getFilteredProjectSelector)
  // // The pagination is commented out until the next iteration
  // let currentPage = useEqualSelector(getCurrentPage)
  // let currentItems = useEqualSelector(getCurrentItems)
  // let pageSize = useEqualSelector(getPageSize)
  // let totalCount = p.length || 0
  //  const PAGE_SIZE_LIMIT = 10
  // // The pagination is commented out until the next iteration
  const projectList = [
    {
      id: 0,
      name: 'Select all',
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


  const setSortedArr = useCallback((sortParams) => {
    handleSortingChange(filteredProjects, sortParams)
  }, [filteredProjects])

  useEffect(() => {
    setSortedArr(sortParams);
  }, [filteredProjects, selectedDateForPM, sortParams])

  useEffect(() => {
    dispatch(clearPmProjects())
    dispatch(getAllProjects())
  }, [month])

  useEffect(() => {
    if (selectedProject.id) {
      const currentProject = projectList.find((item) => {
        return item.id === selectedProject.id
      })
      if (currentProject.length) {
        onSelectProject(currentProject)
      }
    }
  }, [selectedProject, projectList])

  // // The pagination is commented out until the next iteration
  // useEffect(() => {
  //   let items = currentItemsGets(pageSize, currentPage, p)
  //   dispatch(setCurrentItems(items))
  // }, [pageSize, currentPage, p])

  // useEffect(() => {
  //      dispatch(setPageSize(PAGE_SIZE_LIMIT))
  // }, [])
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
    if (data.id === 0) {
      dispatch(setShownProject({}))
    } else {
      dispatch(setShownProject(data))
    }
    dispatch(setSelectedProject(data))
  }

  const projectsList = sorting.map((e) => {
    return <ReportItemProject key={e.id} p={e} openEditModal={openEditModal} />
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
                  className={'max ' + (sortParams.name === null ? 'disable' : sortParams.name ? '' : 'disable')}
                  onClick={() => {
                    setSortParams({
                      name: true,
                      total_minutes: null,
                    })
                    setSortedArr(sortParams)
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    color="#414141"
                    className="icon pencil_icon"
                  />
                </div>
                <div
                  className={'min ' + (sortParams.name === null ? 'disable' : !sortParams.name ? '' : 'disable')}
                  onClick={() => {
                    setSortParams({
                      name: false,
                      total_minutes: null,
                    })
                    setSortedArr(sortParams)
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
                  className={'max ' + (sortParams.total_minutes === null ? 'disable' : sortParams.total_minutes ? '' : 'disable')}
                  onClick={() => {
                    setSortParams({
                      name: null,
                      total_minutes: true,
                    })
                    setSortedArr(sortParams)
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    color="#414141"
                    className="icon pencil_icon"
                  />
                </div>
                <div
                  className={'min ' + (sortParams.total_minutes === null ? 'disable' : !sortParams.total_minutes ? '' : 'disable')}
                  onClick={() => {
                    setSortParams({
                      name: null,
                      total_minutes: false,
                    })
                    setSortedArr(sortParams)
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
