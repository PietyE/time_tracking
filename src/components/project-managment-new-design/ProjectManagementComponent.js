import React, { useCallback, useEffect, useState } from 'react'
import SelectMonth from '../ui/select-month'
import {
  RowDetailState,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-bootstrap4'
import { connect, useDispatch } from 'react-redux'
import {
  getAllProjectsSelector,
  getSelectedDateForPMSelector,
  getSelectedMonthForPMSelector,
  getIsFetchingPmPageSelector,
  getIsShowEditModalSelector,
  getIsShowCreateModalSelector,
  getProjectManagerListSelector,
  getSelectedPmSelector, getShownProjectSelector, getFilteredProjectSelector,
} from '../../reducers/projects-management'
import {
  changeSelectedDateProjectsManagement, clearPmProjects,
  getAllProjects, setSelectedProjectId,
  downloadAllTeamProjectReport,
  setShowCreateModal, setShowEditModal,
  setPm, setShownProject, getProjectReportById,
} from '../../actions/projects-management'
import RowDetail from './components/RowDetail'
import CreateProjectModal from './components/CreateProjectModal'
import EditProjectModal from './components/EditProjectModal'
import './style.scss'
import { Button } from 'react-bootstrap'
import SpinnerStyled from '../ui/spinner'
import Select from '../ui/select'
import { getCurrentUserSelector } from '../../reducers/profile'
import {isEmpty} from 'lodash'
import {convertMinutesToHours} from '../../utils/common'
import Filter from "../ui/filter";

const ProjectManagementComponent =({
                                     selectedDateForPM,
                                     changeSelectedDateProjectsManagement,
                                     getAllProjects,
                                     projects,
                                     clearPmProjects,
                                     isFetching,
                                     month,
                                     setShowCreateModal,
                                     setShowEditModal,
                                     isEditModalShow,
                                     isCreateModalShow,
                                     projectManagers,
                                     selectedPm,
                                     setPm,
                                     currentPm,
                                     shownProject,
                                     setShownProject,
                                     filteredProjects
}) => {
  const dispatch = useDispatch()

  useEffect(()=>{
    if(isEmpty(selectedPm)){
      setPm(currentPm)
    }
  },[])

  useEffect(()=>{
    clearPmProjects()
    setExpandedRowIds([])
    getAllProjects()
  },[month])

    const [columns] = useState([
      { name: 'project', title: 'PROJECT NAME' },
      { name: 'occupancy', title: 'ESTIMATE' },
      { name: 'hours', title: 'HOURS WORKED' },
      // { name: 'report', title: 'Report' },
      // { name: 'actions', title: 'Actions' },
    ])

    const [typeProjects] = useState([
        {name: 'Active'},
        {name: 'Archive'},
    ])

    const _downloadAllTeamProjectReport = useCallback(
      (data) => {
        dispatch(downloadAllTeamProjectReport(data))
      },
      [dispatch],
    )
  const _getProjectReportById = useCallback(
    (data) => {
      dispatch(getProjectReportById(data))
    },
    [dispatch],
  )
    const _setSelectedProjectId = useCallback(
      (data) => {
        dispatch(setSelectedProjectId(data))
      },
      [dispatch],
    )
    const openEditModal = (id) => {
      _setSelectedProjectId(id)
      setShowEditModal(true)
    }
  const [rows, setRows] = useState([])
  useEffect(() => {
        const reformatProjects = filteredProjects.map(project => ({
          project: project.name,
          occupancy: ' ',
          hours: convertMinutesToHours(project?.total_minutes) || 0,
          report: <Button variant = "outline-*" onClick = {() => _downloadAllTeamProjectReport(project.id)}>
            <span className = "oi oi-cloud-download"/>
          </Button>,
          actions: <span className = "oi oi-pencil" onClick = {() => openEditModal(project.id)}/>,
          id: project.id,
        }))
        setRows(reformatProjects)
    }, [filteredProjects, projects])

    const [expandedRowIds, setExpandedRowIds] = useState([])

  const onSelectPm = (data) => {
    setPm(data)
    setShownProject(null)
    setExpandedRowIds([])
    getAllProjects()
  }

  const clearSelectedProject = () => {
    setShownProject(null)
  }
  const onSelectProject = (data) => {
    setShownProject(data)
    _getProjectReportById(data.id)
  }

  return (
      <div className="project">
          <div className="container">
              <h1 className="page-title">
                  <span>Project management</span>
                  <button
                      type = 'submit'
                      className = 'btn btn-add-new'
                      onClick = {()=>setShowCreateModal(true)}
                  >
                      Add new project
                  </button>
              </h1>
          </div>
          {isFetching && <SpinnerStyled/>}
              <div className = "container ">
                  <div className = "flex row  justify-content-between">
                      <div className={'left-cont'}>
                                <Select
                                    title="Search by PM or developer"
                                    listItems={projectManagers}
                                    onSelected={onSelectPm}
                                    valueKey="name"
                                    idKey="id"
                                    extraClassContainer={' search search-manger'}
                                    initialChoice={selectedPm || currentPm}
                                    isSearch
                                />
                                <div className='divider'>-</div>
                                <Select
                                    title="Projects"
                                    listItems = {projects}
                                    onSelected={onSelectProject}
                                    valueKey="name"
                                    idKey="id"
                                    extraClassContainer={'select-project'}
                                    initialChoice={shownProject}
                                    onClear={clearSelectedProject}
                                    // disabled={!projects?.length}
                                    isSearch
                                />

                                <SelectMonth
                                    extraClassNameContainer={'month_select'}
                                    selectedDate = {selectedDateForPM}
                                    setNewData = {changeSelectedDateProjectsManagement}
                                />

                            </div>
                              <Select
                                  title="Active"
                                  listItems = {typeProjects}
                                  onSelected={onSelectProject}
                                  valueKey="name"
                                  idKey="id"
                                  extraClassContainer={'filter'}
                                  initialChoice={'Active'}
                                  onClear={clearSelectedProject}
                                  // disabled={!projects?.length}
                                  isSearch
                              />
                  </div>
                  <div className="row table__titles ">
                      <div className="col-lg-5">PROJECT NAME</div>
                      <div className="col-lg-2">ESTIMATE</div>
                      <div className="col-lg-3">HOURS WORKED</div>
                  </div>
              </div>

              <CreateProjectModal show = {isCreateModalShow} />
              <EditProjectModal show = {isEditModalShow} />
      </div>)
  }

const mapStateToProps = (state) => ({
  selectedDateForPM: getSelectedDateForPMSelector(state),
  projects: getAllProjectsSelector(state),
  isFetching: getIsFetchingPmPageSelector(state),
  month: getSelectedMonthForPMSelector(state),
  isEditModalShow: getIsShowEditModalSelector(state),
  isCreateModalShow: getIsShowCreateModalSelector(state),
  projectManagers: getProjectManagerListSelector(state),
  selectedPm: getSelectedPmSelector(state),
  currentPm: getCurrentUserSelector(state),
  shownProject: getShownProjectSelector(state),
  filteredProjects: getFilteredProjectSelector(state),
})
const actions = {
  changeSelectedDateProjectsManagement,
  getAllProjects,
  clearPmProjects,
  setShowEditModal,
  setShowCreateModal,
  setPm,
  setShownProject,
}


export default connect(mapStateToProps, actions)(ProjectManagementComponent)
