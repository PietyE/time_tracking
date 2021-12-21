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
import { useDispatch, useSelector} from 'react-redux'
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
import {Button} from 'react-bootstrap'
import SpinnerStyled from '../ui/spinner'
import Select from '../ui/select'
import {getCurrentUserSelector} from '../../reducers/profile'
import {isEmpty, isEqual} from 'lodash'
import {convertMinutesToHours} from '../../utils/common'

const ProjectManagementComponent = () => {
    const [expandedRowIds, setExpandedRowIds] = useState([])

    const selectedDateForPM = useSelector(getSelectedDateForPMSelector,isEqual);
    const  projects = useSelector(getAllProjectsSelector, isEqual);
    const isFetching =  useSelector(getIsFetchingPmPageSelector, isEqual);
    const month = useSelector(getSelectedMonthForPMSelector,isEqual);
    let isEditModalShow = useSelector(getIsShowEditModalSelector,isEqual);
    let isCreateModalShow = useSelector(getIsShowCreateModalSelector,isEqual);
    const projectManagers = useSelector(getProjectManagerListSelector,isEqual);
    let selectedPm = useSelector(getSelectedPmSelector,isEqual);
    let currentPm = useSelector( getCurrentUserSelector,isEqual);
    let shownProject = useSelector(getShownProjectSelector,isEqual);
    let filteredProjects = useSelector(getFilteredProjectSelector,isEqual)

    const dispatch = useDispatch();

    const [columns] = useState([
        {name: 'project', title: 'Project'},
        {name: 'occupancy', title: 'Occupancy'},
        {name: 'hours', title: 'Hours'},
        {name: 'report', title: 'Report'},
        {name: 'actions', title: 'Actions'},
    ])

    let reformatProjects = []

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

    const _changeSelectedDateProjectsManagement = useCallback(
        (data)=>{
            dispatch( changeSelectedDateProjectsManagement(data))
        }
    )

    const openEditModal = (id) => {
        _setSelectedProjectId(id)
        dispatch( setShowEditModal(true))
    }
    const [rows, setRows] = useState([])
    const onSelectPm = (data) => {
        dispatch(setPm(data))
        dispatch( setShownProject(null))
        setExpandedRowIds([])
        dispatch(getAllProjects())
    }

    const clearSelectedProject = () => {
       dispatch( setShownProject(null))
    }
    const onSelectProject = (data) => {
        dispatch( setShownProject(data))
        _getProjectReportById(data.id)
    }

    const reformatProj = ()=>{
         reformatProjects = filteredProjects.map(project => ({
            project: project.name,
            occupancy: ' ',
            hours: convertMinutesToHours(project?.total_minutes) || 0,
            report: <Button variant="outline-*" onClick={() => _downloadAllTeamProjectReport(project.id)}>
                <span className="oi oi-cloud-download"/>
            </Button>,
            actions: <span className="oi oi-pencil" onClick={() => openEditModal(project.id)}/>,
            id: project.id,
        }))
    }

    useEffect(() => {
        reformatProj()
        setRows(reformatProjects)
    }, [filteredProjects, projects])

    useEffect(() => {
        if (isEmpty(selectedPm)) {
           dispatch( setPm(currentPm));
        }

    }, [ ])

    useEffect(() => {
        dispatch( getAllProjects())
        },[])

    useEffect(() => {
        dispatch( clearPmProjects())
        setExpandedRowIds([])
        dispatch( getAllProjects())
    }, [month])


    return (
        <>
            {isFetching && <SpinnerStyled/>}
            <div className="container project_management_container">
                <div className="flex row justify-content-between">

                    <Select
                        title="choose project manager..."
                        listItems={projectManagers}
                        onSelected={onSelectPm}
                        valueKey="name"
                        idKey="id"
                        extraClassContainer={'developer_select pm_select'}
                        initialChoice={selectedPm || currentPm}
                        isSearch
                    />

                    <Select
                        title="choose project..."
                        listItems={projects}
                        onSelected={onSelectProject}
                        valueKey="name"
                        idKey="id"
                        extraClassContainer={'project_select project_select'}
                        initialChoice={shownProject}
                        onClear={clearSelectedProject}
                        disabled={!projects?.length}
                        isSearch
                    />

                    <SelectMonth
                        extraClassNameContainer={'pm_month_select'}
                        selectedDate={selectedDateForPM}
                        setNewData={_changeSelectedDateProjectsManagement}
                    />

                    <button
                        type='submit'
                        className='btn btn-outline-secondary'
                        onClick={() => dispatch( setShowCreateModal(true))}
                    >
                        Add new project
                    </button>
                </div>

                <div className="card mt-5 mb-5">
                    <Grid
                        rows={rows}
                        columns={columns}
                    >
                        <RowDetailState
                            expandedRowIds={expandedRowIds}
                            onExpandedRowIdsChange={setExpandedRowIds}
                            defaultExpandedRowIds={[]}
                        />
                        <Table
                            messages={{
                                noData: isFetching ? '' : 'There are no active projects to display.'
                            }}
                        />
                        <TableHeaderRow resizingEnabled/>
                        <TableRowDetail contentComponent={RowDetail}/>
                    </Grid>
                </div>
            </div>

            <CreateProjectModal show={isCreateModalShow}/>
            <EditProjectModal show={isEditModalShow}/>
        </>
    )
}



export default ProjectManagementComponent
