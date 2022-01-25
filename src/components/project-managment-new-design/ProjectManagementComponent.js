import React, {useCallback, useEffect, useState} from 'react'
import SelectMonth from '../ui/select-month'
import { useDispatch} from 'react-redux'
import {
    getAllProjectsSelector,
    getSelectedDateForPMSelector,
    getSelectedMonthForPMSelector,
    getIsFetchingPmPageSelector,
    getIsShowEditModalSelector,
    getIsShowCreateModalSelector,
    getProjectManagerListSelector,
    getSelectedPmSelector, getShownProjectSelector, getFilteredProjectSelector, getIsShowCreateUserModalSelector,
} from '../../reducers/projects-management'
import {
    changeSelectedDateProjectsManagement, clearPmProjects,
    getAllProjects, setSelectedProjectId,
    setShowCreateModal, setShowEditModal,
    setPm, setShownProject, getProjectReportById, getActiveProjects, setShowCreateUserModal,
} from '../../actions/projects-management'

import './style.scss'
import SpinnerStyled from '../ui/spinner'
import Select from '../ui/select'
import {getCurrentUserSelector} from '../../reducers/profile'
import {isEmpty} from 'lodash'
import ReportItemProject from "../common/repott-item/ReportItemProject";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";
import CreateProjectModal2 from "./components/CreateProjectModal2";
import EditProjectModal2 from "./components/EditProjectModal2";
import useEqualSelector from "../../custom-hook/useEqualSelector";
import CreateProjectModal3 from "./components/CreateProjectModal3";
import CreateUserModal from "./components/CreateUserModal";
import Plus from "../ui/plus";

const ProjectManagementComponent = () => {

    const [p, setP] = useState([])
    const dispatch = useDispatch()

    let selectedDateForPM = useEqualSelector(getSelectedDateForPMSelector);
    let isFetching =useEqualSelector(getIsFetchingPmPageSelector);
    let month = useEqualSelector(getSelectedMonthForPMSelector);
    let isEditModalShow = useEqualSelector(getIsShowEditModalSelector);
    let isCreateModalShow =useEqualSelector(getIsShowCreateModalSelector);
    let isShowCreateUserModal =useEqualSelector(getIsShowCreateUserModalSelector);
    let selectedPm =useEqualSelector(getSelectedPmSelector);
    let currentPm =useEqualSelector(getCurrentUserSelector);
    const  projects = useEqualSelector(getAllProjectsSelector);
    const projectManagers = useEqualSelector(getProjectManagerListSelector)

    useEffect(() => {
        if (isEmpty(selectedPm)) {
            dispatch(setPm(currentPm))
        }
    }, [])

    useEffect(() => {
        dispatch(clearPmProjects())
        dispatch(getAllProjects())
    }, [month])

    useEffect(() => {
        setP(projects);
    }, [projects]);


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
        dispatch(setShowEditModal(true))
    }
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
        dispatch(setPm(data))
        dispatch( setShownProject(null))
        dispatch( getAllProjects())
    }

    const clearSelectedProject = () => {
        dispatch(setShownProject(null))
    }
    const onSelectProject = (data) => {
        dispatch(setShownProject(data))
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
                            className={'btn btn-add-new mr-4 '+(isShowCreateUserModal || isCreateModalShow ?'':'user')}
                            onClick={() => dispatch(setShowCreateUserModal(true))}
                        >
                            Add new user
                        </button>
                        <button
                            type='submit'
                            className='btn btn-add-new  '
                            onClick={() => dispatch(setShowCreateModal(true))}
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

            {/*<CreateProjectModal2 show={isCreateModalShow} e={projectManagers}/>*/}
            <CreateProjectModal3 show={isCreateModalShow}/>
            <CreateUserModal show={isShowCreateUserModal} e={projectManagers}/>
            <EditProjectModal2 show={isEditModalShow} />

        </div>)
}

export default ProjectManagementComponent
