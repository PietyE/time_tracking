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
    getProjectReportById, setPm,
    setSelectedProject, setShowEditModal
} from "../../../actions/projects-management";
import {
    getActiveDevSelector,
    getActivePmInCurrentProjectSelector,
    getCurrentProjectSelector,
    getDeactivatedMembersSelector,
    getIsFetchingPmPageSelector,
    getProjectManagerListSelector,
    getProjectName,
    getSelectedProjectIdSelector,
    getSelectedProjectSelector,
    getUsersSelector
} from "../../../reducers/projects-management";
import {isEqual} from "lodash";
import {getProjectsSelector} from "../../../selectors/developer-projects";
import fileText from "../../../images/file-text1.svg"
import ChekMark from "../../../images/check-mark1.svg"
import UserIcon from "../../../images/user1.svg"
import ProjectIcon from "../../../images/card-text1.svg"
import {parseMinToHoursAndMin} from "../../../utils/common";
import Select from "../../ui/select";
import {selectProject} from "../../../actions/times-report";


function EditProjectModal2({show}) {
    const currentProjectActiveDevelopers = useSelector(getActiveDevSelector, isEqual)
    const projects = useSelector(getProjectsSelector, isEqual);
    const [isEdit, setEdit] = useState(false);


    let [addMember, setAddMember] = useState(false);
    const [checkedUsers, setCheckedUsers] = useState([]);
    const [currentEditedTeam, setEditedTeam] = useState([]);


    const currentProjectId = useSelector(getSelectedProjectIdSelector, isEqual)
    const currentProject = useSelector((getSelectedProjectSelector, isEqual))
    const currentApiProject = useSelector(getCurrentProjectSelector, isEqual)
    const projectName = useSelector(getProjectName, isEqual)


    const projectManagersList = useSelector(getProjectManagerListSelector, isEqual)
    const activeProjectManager = useSelector(getActivePmInCurrentProjectSelector, isEqual)
    const deactivatedUsers = useSelector(getDeactivatedMembersSelector, isEqual)

    const isFetching = useSelector(getIsFetchingPmPageSelector)

    const availableProjectManagersList = projectManagersList.filter(pm => pm?.id !== activeProjectManager?.user_id)


    const [valuesFromApi, setValuesFromApi] = useState(null)

    const projectTeamM = useSelector(getUsersSelector);
    const closeAddUser = () => {
        setAddMember(false)
    }

    const addSelected = (e) => {
        e.preventDefault();
        setEditedTeam([...new Set(currentEditedTeam.concat(checkedUsers))])
    }

    const deleteItem = (id) => {
        let res = currentEditedTeam.filter((e) => {
            if (e.user_id !== id && e.id !== id) {
                return e;
            }
        });
        setEditedTeam(res);
    }


    const dispatch = useDispatch()

    const onSelectPm = (data) => {
        dispatch(setPm(data))
    }

    const onSelectProject = (data) => {
        dispatch(selectProject(data))
    }

    const editToggle = () => {
      setEdit(!isEdit)
    }

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
            dispatch(changeProjectName({id, data}))
        },
        [dispatch],
    )
    const _changeUserOnProject = useCallback(
        (id, data) => {
            dispatch(changeUserOnProject({id, data}))
        },
        [dispatch],
    )
    const _addUsersOnProject = useCallback(
        (data) => {
            dispatch(addUsersOnProject({data}))
        },
        [dispatch],
    )
    useEffect(() => {
        if (projectName) {
            setValuesFromApi({
                projectName: projectName,
                team: currentProjectActiveDevelopers,
                projectManager: activeProjectManager,
                total_minutes: currentApiProject.total_minutes
            })
        }
        setEditedTeam(currentProjectActiveDevelopers)
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

    let teamMList = valuesFromApi?.team?.map((e) => {
        return <div key={e.user_id}>
            <TeamM e={e} hovers={'120h 50m'} del={deleteItem}/>
        </div>
    });

    return <div className={'edit-modal-container ' + (show ? 'active' : '')}>
        <WindowInfo close={handleClose} title={valuesFromApi?.projectName} editToggle={editToggle}>
            <InfoItemM icon={ProjectIcon}>
                <span className="info_text">PROJECT NAME</span>
                {!isEdit ?
                    <span className="info_data">{valuesFromApi?.projectName}</span>
                    :
                    <span className="info_data">
                        <Select
                            title={valuesFromApi?.projectName}
                            listItems={projects}
                            onSelected={onSelectProject}
                            valueKey="name"
                            idKey="id"
                            extraClassContainer={' search search-manger'}
                            initialChoice={currentApiProject}
                            isSearch
                        />
                    </span>
                }
            </InfoItemM>
            <InfoItemM icon={UserIcon}>
                <span className="info_text">PROJECT OWNER</span>
                {!isEdit ?
                    <span className="info_data">{valuesFromApi?.projectManager?.name}</span>
                    :
                    <span className="info_data">
                        <Select
                            title={valuesFromApi?.projectManager?.name}
                            listItems={projectManagersList}
                            onSelected={onSelectPm}
                            valueKey="name"
                            idKey="id"
                            extraClassContainer={' search search-manger'}
                            initialChoice={valuesFromApi?.projectManager}
                            isSearch
                        />
                    </span>
                }
            </InfoItemM>
            <InfoItemM icon={ChekMark}>
                <span className="info_text">LAST SINCE</span>
                <span className="info_data">{parseMinToHoursAndMin(valuesFromApi?.total_minutes, true)}</span>
            </InfoItemM>

            <div className="description-cont">
                <h3 className="info_text">DESCRIPTION</h3>
                {!isEdit?
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consequatur cumque dicta dolorem
                        dolores eos harum ipsam iusto laudantium, modi nemo nobis obcaecati saepe sit voluptatibus.
                        Dolore
                        quo rerum unde?
                    </p>
                    :
                    <textarea className={'project-description'} name="" id="" cols="30" rows="10">

                    </textarea>
                }

            </div>
            <div className="projects_info">
                <div className="project_data">
                    <div className="project_data_header">
                        <span className="headers project">DEVELOPER NAME</span>
                        <span className="headers">OCCUPANCY</span>
                        <span className="headers">HOURS</span>
                    </div>
                    <div className="team-container">
                        {teamMList}
                    </div>
                    <div className="edit-control container">
                        <div className="row">
                            <div className="col-5 add-new " onClick={() => {
                                setAddMember(!addMember)
                            }}>
                                       <span className="row align-items-center">
                                             <Plus/>
                                        <span>
                                             Add new developers
                                        </span>
                                        </span>
                            </div>
                            {/*<div className="col-6">*/}
                            {/*    <button className="btn btn-add">Save changes</button>*/}
                            {/*    <button className="btn btn-cancel" onClick={handleClose}>Cancel</button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                {addMember &&
                <AddSelectedM
                    teamM={projectTeamM}
                    closeAddUser={closeAddUser}
                    checkedUsers={checkedUsers}
                    setCheckedUsers={setCheckedUsers}
                    addSelected={addSelected}
                />
                }
            </div>
        </WindowInfo>
    </div>
}


export default EditProjectModal2
