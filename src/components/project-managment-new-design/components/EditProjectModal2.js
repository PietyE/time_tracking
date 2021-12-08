import React, {useCallback, useEffect, useState} from "react";
import WindowInfo from "../../common/window-info/WindowInfo";
import InfoItemM from "../../common/window-info/components/InfoItemM";
import TeamM from "../../common/team-m/TeamM";
import Plus from "../../ui/plus";
import AddSelectedM from "../../common/AddSelectedM/AddSelectedM";
import {useDispatch, useSelector} from "react-redux";
import {
    addUsersOnProject,
    changeProjectName,
    changeUserOnProject,
    getProjectReportById,
    setSelectedProject, setShowEditModal
} from "../../../actions/projects-management";
import {
    getActiveDevSelector,
    getActivePmInCurrentProjectSelector, getDeactivatedMembersSelector, getIsFetchingPmPageSelector,
    getProjectManagerListSelector,
    getProjectName,
    getSelectedProjectIdSelector,
    getSelectedProjectSelector
} from "../../../reducers/projects-management";
import {isEqual} from "lodash";


function EditProjectModal2({show}) {
    let [addMember, setAddMember] = useState(false)

    const dispatch = useDispatch()

    const _getProjectReportById = useCallback(
        (data) => {
            dispatch(getProjectReportById(data))
        },
        [dispatch],
    )
    const _setSelectedProject = useCallback(
        (data) => {
            dispatch(setSelectedProject(data))
        },
        [dispatch],
    )
    const _changeProjectName = useCallback(
        (id, data) => {
            dispatch(changeProjectName({ id, data }))
        },
        [dispatch],
    )
    const _changeUserOnProject = useCallback(
        (id, data) => {
            dispatch(changeUserOnProject({ id, data }))
        },
        [dispatch],
    )
    const _addUsersOnProject = useCallback(
        (data) => {
            dispatch(addUsersOnProject({ data }))
        },
        [dispatch],
    )

    const currentProjectId = useSelector(getSelectedProjectIdSelector, isEqual)
    const currentProject = useSelector((getSelectedProjectSelector, isEqual))
    const projectName = useSelector(getProjectName, isEqual)

    const projectManagersList = useSelector(getProjectManagerListSelector, isEqual)
    const activeProjectManager = useSelector(getActivePmInCurrentProjectSelector, isEqual)
    const currentProjectActiveDevelopers = useSelector(getActiveDevSelector, isEqual)
    const deactivatedUsers = useSelector(getDeactivatedMembersSelector, isEqual)

    const isFetching = useSelector(getIsFetchingPmPageSelector)

    const availableProjectManagersList = projectManagersList.filter(pm => pm?.id !== activeProjectManager?.user_id)


    const [valuesFromApi, setValuesFromApi] = useState(null)


    useEffect(() => {
        if (projectName) {
            setValuesFromApi({
                projectName: projectName,
                team: currentProjectActiveDevelopers,
                projectManager: activeProjectManager,
            })
        }
    }, [projectName, currentProjectActiveDevelopers, activeProjectManager])

    useEffect(() => {
        if (!!show) {
            if (!currentProject) {
                _getProjectReportById(currentProjectId)
            }
        }
    }, [_getProjectReportById, currentProjectId, show])

    useEffect(() => {
        if (!!currentProject) {
            _setSelectedProject(currentProject)
        }
    }, [currentProject])

    const pmInitialValue = {
        name: '',
        user_id: '',
        is_full_time: true,
        is_active: true,
    }
    let initialValues = {
        projectName: '',
        team: [],
        projectManager: pmInitialValue,
    }

    const handleClose = () => dispatch(setShowEditModal(false))

    const onSubmit = values => {
        _changeProjectName(currentProjectId, values.projectName)
    }

    return <>
        <WindowInfo>
            <InfoItemM>
                <span className="info_text">LAST SINCE</span>
                <span className="info_data">01 Sep, 2021</span>
            </InfoItemM>
            <InfoItemM>
                <span className="info_text">LAST SINCE</span>
                <span className="info_data">01 Sep, 2021</span>
            </InfoItemM>
            <InfoItemM>
                <span className="info_text">LAST SINCE</span>
                <span className="info_data">01 Sep, 2021</span>
            </InfoItemM>
            <InfoItemM>
                <span className="info_text">LAST SINCE</span>
                <span className="info_data">01 Sep, 2021</span>
            </InfoItemM>
            <InfoItemM>
                <span className="info_text">LAST SINCE</span>
                <span className="info_data">01 Sep, 2021</span>
            </InfoItemM>
            <InfoItemM>
                <span className="info_text">LAST SINCE</span>
                <span className="info_data">01 Sep, 2021</span>
            </InfoItemM>
            <InfoItemM>
                <span className="info_text">LAST SINCE</span>
                <span className="info_data">01 Sep, 2021</span>
            </InfoItemM>
            <div className="projects_info">
                <div className="project_data">
                    <div className="project_data_header">
                        <span className="headers project">DEVELOPER NAME</span>
                        <span className="headers">OCCUPANCY</span>
                        <span className="headers">HOURS</span>
                    </div>
                    <div className="team-container">
                        <TeamM e={{
                            name: 'Some users',
                            email: 'user@gmail.com',
                            id: '123'
                        }}
                               d={true}
                               hovers={'190h 59m'}
                        />
                        <TeamM e={{
                            name: 'Some users',
                            email: 'user@gmail.com',
                            id: '123'
                        }}
                               d={true}
                               hovers={'190h 59m'}
                        />
                        <TeamM e={{
                            name: 'Some users',
                            email: 'user@gmail.com',
                            id: '123'
                        }}
                               d={true}
                               hovers={'190h 59m'}
                        />
                        <TeamM e={{
                            name: 'Some users',
                            email: 'user@gmail.com',
                            id: '123'
                        }}
                               d={true}
                               hovers={'190h 59m'}
                        />
                        <TeamM e={{
                            name: 'Some users',
                            email: 'user@gmail.com',
                            id: '123'
                        }}
                               d={true}
                               hovers={'190h 59m'}
                        />
                    </div>
                    <div className="edit-control container">
                        <div className="row">
                            <div className="col-5 add-new " onClick={()=>{setAddMember(!addMember)}}>

                                        <span className="row align-items-center">
                                             <Plus/>
                                        <span>
                                             Add new developers
                                        </span>
                                        </span>

                            </div>
                            <div className="col-6">
                                <button className="btn btn-add">Save changes</button>
                                <button className="btn btn-cancel">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                {addMember&&
                <AddSelectedM/>
                }
            </div>
        </WindowInfo>
    </>
}


export default EditProjectModal2
