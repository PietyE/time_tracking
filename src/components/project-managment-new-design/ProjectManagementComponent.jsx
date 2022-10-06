import React, { useCallback, useEffect, useRef } from 'react'
import SelectMonth from 'components/ui/select-month'
import { useDispatch } from 'react-redux'
import {
  getAllProjectsSelector,
  getFilteredProjectSelector,
  getIsFetchingPmPageSelector,
  getIsShowCreateModalSelector,
  getIsShowCreateUserModalSelector,
  getIsShowEditModalSelector,
  getProjectManagerListSelector,
  getSelectedPmSelector,
  getSelectedProjectSelector,
} from 'reducers/projects-management'
import {
  clearPmProjects,
  getAllProjects,
  setPm,
  setSelectedProject,
  setSelectedProjectId,
  setShowCreateModal,
  setShowEditModal,
  setShownProject,
} from 'actions/projects-management'

import './style.scss'
import SpinnerStyled from 'components/ui/spinner'
import Select from 'components/ui/select'
import { getCurrentUserSelector } from 'reducers/profile'
import ReportItemProject from 'components/common/repott-item/ReportItemProject'
import EditProjectModal from './components/editProjectModal/EditProjectModal'
import useEqualSelector from 'custom-hook/useEqualSelector'
import CreateProjectModal from './components/createProjectModal/CreateProjectModal'
import CreateUserModal from './components/CreateUserModal'
import useSorting from 'custom-hook/useSorting'
import ArchivedSeparator from './components/ArchivedSeparator'
import SortingButton from 'components/ui/sortingButton'
import { ASCEND } from '../../constants/order-constant'
import { changeSelectedDate } from 'actions/calendar'
import { getSelectedDate } from 'selectors/calendar'

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
  const SORT_NAME = 'name'
  const {
    sorting,
    sortingParameter,
    handleSortingChange,
    toggleSortingParameter,
  } = useSorting({ [SORT_NAME]: ASCEND })
  const SORT_TIME = 'total_minutes'
  const dispatch = useDispatch()

  const projectDivRef = useRef(null)

  let selectedDateForPM = useEqualSelector(getSelectedDate)
  let isFetching = useEqualSelector(getIsFetchingPmPageSelector)
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
      name: 'Select All',
    },
    ...projects,
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

  const setSortedArr = useCallback(() => {
    handleSortingChange(filteredProjects)
  }, [filteredProjects, handleSortingChange])

  useEffect(() => {
    setSortedArr()
  }, [filteredProjects, selectedDateForPM, sortingParameter, setSortedArr])

  useEffect(() => {
    dispatch(clearPmProjects())
    dispatch(getAllProjects())
  }, [selectedDateForPM, isEditModalShow, dispatch])

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
      dispatch(changeSelectedDate(data))
    },
    [dispatch]
  )

  const onSelectPm = (data) => {
    dispatch(setPm(data))
    dispatch(setShowEditModal(false))
    dispatch(setShownProject(null))
    dispatch(getAllProjects())
    dispatch(setSelectedProject(projectList[0]))
  }

  const onSelectProject = useCallback(
    (data) => {
      dispatch(setShowEditModal(false))
      if (data.id === 0) {
        dispatch(setShownProject({}))
      } else {
        dispatch(setShownProject(data))
        dispatch(setShowEditModal(true))
      }
      dispatch(setSelectedProject(data))
      dispatch(setSelectedProjectId(data.id))
    },
    [dispatch]
  )

  useEffect(() => {
    if (selectedProject.id) {
      const currentProject = projectList.find((item) => {
        return item.id === selectedProject.id
      })
      if (currentProject.length) {
        onSelectProject(currentProject)
      }
    }
  }, [selectedProject, projectList, onSelectProject])

  const addNewProject = () => {
    dispatch(setShowEditModal(false))
    dispatch(setShowCreateModal(true))
    dispatch(setSelectedProject(projectList[0]))
    dispatch(setShownProject({}))
    dispatch(setPm(projectManagerSelectList[0]))
    dispatch(setSelectedProject(projectList[0]))
  }
  const projectsListNotArchived = sorting

    .filter((e) => !e.is_archived)
    .map((e) => {
      return (
        <ReportItemProject
          key={e.id}
          p={e}
          openEditModal={openEditModal}
          isEditModalShown={isEditModalShow}
        />
      )
    })

  const projectsListArchived = sorting
    .filter((e) => e.is_archived)
    .map((e) => {
      return (
        <ReportItemProject
          key={e.id}
          p={e}
          openEditModal={openEditModal}
          isEditModalShown={isEditModalShow}
        />
      )
    })

  return (
    <div className="common-container">
      <div
        ref={projectDivRef}
        className={`project_management-container ${
          isEditModalShow ? 'show-modal' : ''
        }`}
      >
        <div className="container">
          <h1 className="page-title">
            <span>Project management</span>
            <div className="buttons-cont">
              {/* <button
              type="submit"
              className={
                'btn btn-add-new mr-4 ' +
                (isShowCreateUserModal || isCreateModalShow ? '' : 'user')
              }
              onClick={() => dispatch(setShowCreateUserModal(true))}
            >
              Add new user
            </button> */}
              <button
                type="submit"
                className="btn btn-add-new  "
                onClick={addNewProject}
              >
                Add new project
              </button>
            </div>
          </h1>
        </div>
        {isFetching && <SpinnerStyled />}
        <div className="container ">
          <div className="row  container__selects">
            <div className="container__selects-progects__fields">
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
              onChange={_changeSelectedDateProjectsManagement}
              showYear
            />
          </div>
          <div className="row table__titles">
            <div className="col-8">
              <SortingButton
                onClick={() => toggleSortingParameter(SORT_NAME)}
                sortingType={sortingParameter?.name}
                title="PROJECT NAME"
              />
              {/* <div className="sort-by table__titles-sort__container">
                <div
                  className="sort-title"
                  onClick={() => toggleSortingParameter(SORT_NAME)}
                >
                  PROJECT NAME
                </div>
                <div className="cart-cont">
                  <div
                    className={
                      'max ' +
                      (sortingParameter?.name === null ||
                      sortingParameter?.name === undefined
                        ? 'disable'
                        : sortingParameter.name
                        ? ''
                        : 'disable')
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCaretUp}
                      color="#414141"
                      className="icon pencil_icon"
                    />
                  </div>
                  <div
                    className={
                      'min ' +
                      (sortingParameter?.name === null ||
                      sortingParameter?.name === undefined
                        ? 'disable'
                        : !sortingParameter.name
                        ? ''
                        : 'disable')
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      color="#414141"
                      className="icon pencil_icon"
                    />
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-3 table__titles-sort__container">
              <SortingButton
                onClick={() => toggleSortingParameter(SORT_TIME)}
                sortingType={sortingParameter?.total_minutes}
                title="HOURS WORKED"
              />
              {/* <div className="sort-by">
                <div
                  className="sort-title"
                  onClick={() => toggleSortingParameter(SORT_TIME)}
                >
                  HOURS WORKED
                </div>
                <div className="cart-cont">
                  <div
                    className={
                      'max ' +
                      (sortingParameter?.total_minutes === null ||
                      sortingParameter?.total_minutes === undefined
                        ? 'disable'
                        : sortingParameter.total_minutes
                        ? ''
                        : 'disable')
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCaretUp}
                      color="#414141"
                      className="icon pencil_icon"
                    />
                  </div>
                  <div
                    className={
                      'min ' +
                      (sortingParameter?.total_minutes === null ||
                      sortingParameter?.total_minutes === undefined
                        ? 'disable'
                        : !sortingParameter.total_minutes
                        ? ''
                        : 'disable')
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      color="#414141"
                      className="icon pencil_icon"
                    />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {projectsListNotArchived}
          <ArchivedSeparator />
          {projectsListArchived}
          {/* The pagination is commented out until the next iteration */}
          {/* <Pagination
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          paginationDeiplayed={5}
        /> */}
          {/* The pagination is commented out until the next iteration */}
        </div>
        <CreateProjectModal show={isCreateModalShow} />
        <CreateUserModal show={isShowCreateUserModal} e={projectManagers} />
      </div>
      <div className="modal-container">
        <EditProjectModal
          show={isEditModalShow}
          month={selectedDateForPM.month}
        />
      </div>
    </div>
  )
}

export default ProjectManagementComponent
