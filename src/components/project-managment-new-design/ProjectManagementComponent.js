import React, {useCallback, useEffect, useState} from 'react'
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
import {connect, useDispatch} from 'react-redux'
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
    setPm, setShownProject, getProjectReportById, getActiveProjects,
} from '../../actions/projects-management'
import RowDetail from './components/RowDetail'
import CreateProjectModal from './components/CreateProjectModal'
//import EditProjectModal from './components/EditProjectModal'

import './style.scss'
import {Button} from 'react-bootstrap'
import SpinnerStyled from '../ui/spinner'
import Select from '../ui/select'
import {getCurrentUserSelector} from '../../reducers/profile'
import {isEmpty} from 'lodash'
import {convertMinutesToHours} from '../../utils/common'

import ReportItemProject from "../common/repott-item/ReportItemProject";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp, faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import CreateProjectModal2 from "./components/CreateProjectModal2";
import WindowInfo from "../common/window-info/WindowInfo";
import InfoItemM from "../common/window-info/components/InfoItemM";
import TeamM from "../common/team-m/TeamM";
import Plus from "../ui/plus";
import EditProjectModal2 from "./components/EditProjectModal2";

const ProjectManagementComponent = ({
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
                                        filteredProjects,
                                        getActiveProjects

                                    }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (isEmpty(selectedPm)) {
            setPm(currentPm)
        }
    }, [])

    useEffect(() => {
        clearPmProjects()
        setExpandedRowIds([])
        getAllProjects()
    }, [month])

    const [typeProjects] = useState([
        {name: 'Active', count: 5},
        {name: 'Archive', count: 3},
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
            report: <Button variant="outline-*" onClick={() => _downloadAllTeamProjectReport(project.id)}>
                <span className="oi oi-cloud-download"/>
            </Button>,
            actions: <span className="oi oi-pencil" onClick={() => openEditModal(project.id)}/>,
            id: project.id,
        }))
        setRows(reformatProjects)
    }, [filteredProjects, projects])

    const [expandedRowIds, setExpandedRowIds] = useState([])

    let [p, setP] = useState([])
    useEffect(() => {
        setP(projects);
    }, [projects]);

    const showTypeProject = (item) => {
        if (item.name == 'Active') {
            let activeP = projects.filter(e => e.isActive == true);
            setP(activeP)
        } else {
            setP([])
        }
    }

    const projectsList = p.map((e, i) => {
        return <ReportItemProject key={e.id} p={e} openEditModal={openEditModal}/>
    });

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
                    <div className="buttons-cont">
                        <button
                            type='submit'
                            className='btn btn-add-new mr-4'
                            onClick={() => setShowCreateModal(true)}
                        >
                            Add new user
                        </button>
                        <button
                            type='submit'
                            className='btn btn-add-new '
                            onClick={() => setShowCreateModal(true)}
                        >
                            Add new project
                        </button>
                    </div>
                </h1>
            </div>
            {isFetching && <SpinnerStyled/>}
            <div className="container ">
                <div className="flex row  justify-content-between">
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
                    <SelectMonth
                        extraClassNameContainer={'month_select'}
                        selectedDate={selectedDateForPM}
                        setNewData={changeSelectedDateProjectsManagement}
                    />

                </div>
                <div className="row table__titles">
                    <div className="col-lg-7">
                        <div className="sort-by">
                               <span>
                             PROJECT NAME
                          </span>
                            <span className="cart-cont">
                              <div className={'min'}>
                                   <FontAwesomeIcon
                                       icon={faCaretUp}
                                       color="#414141"
                                       className="icon pencil_icon"
                                   />
                              </div>
                              <div className={'max'}>
                                  <FontAwesomeIcon
                                      icon={faCaretDown}
                                      color="#414141"
                                      className="icon pencil_icon"
                                  />
                              </div>
                          </span>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        HOURS WORKED
                    </div>
                </div>
                {projectsList}
            </div>

            <CreateProjectModal2 show={isCreateModalShow} e={projectManagers}/>
            {/*<EditProjectModal show={isEditModalShow}/>*/}
            <EditProjectModal2 show={isEditModalShow}/>

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
    getActiveProjects
}


export default connect(mapStateToProps, actions)(ProjectManagementComponent)
