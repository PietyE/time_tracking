import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import WindowInfo from '../../../common/window-info/WindowInfo'
import InfoItemM from '../../../common/window-info/components/InfoItemM'
import TeamM from '../../../common/team-m/TeamM'
import HintWindow from "components/ui/HintWindow";
import Plus from '../../../ui/plus'
import AddSelectedM from '../../../common/AddSelectedM/AddSelectedM'
import { useDispatch } from 'react-redux'
import {
  addDeveloperToProject,
  addInactiveProjectManagerToProject, addProjectManagerToProject, addUsersOnProject,
  changeProjectName, changeUserOnProject,
  downloadAllTeamProjectReport,
  getProjectReportById,
  setSelectedProject,
  setShowEditModal,
  getAllProjects
} from '../../../../actions/projects-management'
import {
  getActivePmInCurrentProjectSelector,
  getCurrentProjectSelector, getDeactivatedMembersSelector, getIsFetchingPmPageSelector,
  getProjectManagerListSelector,
  getProjectName, getProjectReportByIdSelector,
  getSelectedProjectIdSelector,
  getSelectedProjectSelector,
  getUsersSelector,
} from '../../../../reducers/projects-management'

import ChekMark from '../../../../images/check-mark1.svg'
import UserIcon from '../../../../images/user1.svg'
import ProjectIcon from '../../../../images/card-text1.svg'
import { parseMinToHoursAndMin, sortArrayOfObjectsAlphabetically} from '../../../../utils/common'
import Select from '../../../ui/select'
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import Spinner from '../../../time-report/components/Spinner'
import useEventListener from '../../../../custom-hook/useEventListener'
import { showAler } from '../../../../actions/alert'
import { WARNING_ALERT } from '../../../../constants/alert-constant'
import useEqualSelector from '../../../../custom-hook/useEqualSelector'

import './EditProjectModal.scss'

function EditProjectModal({ show, month}) {
  const modalRef = useRef(null);
  const [addMember, setAddMember] = useState(false)
  const [checkedUsers, setCheckedUsers] = useState([])
  const [currentEditedTeam, setEditedTeam] = useState([])
  const [isArchivedProject, setArchivedProject] = useState(false)
  const [showHintAddMember, setShowHintAddMember] = useState(false)

  const projectManagersList = useEqualSelector(getProjectManagerListSelector)
  const activeProjectManager = useEqualSelector(getActivePmInCurrentProjectSelector);

  const deactivatedUsers = useEqualSelector(getDeactivatedMembersSelector)
  const currentProjectId = useEqualSelector(getSelectedProjectIdSelector)
  const currentProjectReport = useEqualSelector(
    state => getProjectReportByIdSelector(state, currentProjectId),
  );

  const sortArrayByUserName = (a,b) => {
    return sortArrayOfObjectsAlphabetically(a, b, 'userName')
  }

  const currentProjectActiveDevelopers = useMemo(
    () =>
      currentProjectReport?.users
        .filter((e) => e.is_active && e.userName !== activeProjectManager?.name)
        .map((e) => ({ ...e, name: e.userName, id: e.userId })).sort(sortArrayByUserName) || [],
    [currentProjectReport, activeProjectManager]
  )
  const freeProjectManagersList = useMemo(() => {
       let teamMateID = currentProjectActiveDevelopers.map(member => member.userId)
    return  projectManagersList.filter(user => !teamMateID.includes(user.id))
  }, [currentProjectActiveDevelopers, projectManagersList])

  const currentTeamIds = useMemo(
    () => {
      let currentProjectActiveDevelopersID = currentProjectActiveDevelopers.map(e => e.id)
      currentProjectActiveDevelopersID.push(activeProjectManager?.user_id)
      return currentProjectActiveDevelopersID
    },
    [currentProjectActiveDevelopers, activeProjectManager]
  );
  
  const currentProject = useEqualSelector(getSelectedProjectSelector)
  const currentApiProject = useEqualSelector(getCurrentProjectSelector)
  const projectName = useEqualSelector(getProjectName)
  const isFetchingPMPage = useEqualSelector(getIsFetchingPmPageSelector)

  const [valuesFromApi, setValuesFromApi] = useState(null)
  const projectTeamM = useEqualSelector(getUsersSelector);
  
  const closeAddUser = () => {
    setAddMember(false)
  }

  const dispatch = useDispatch()

  const addSelected = useCallback((e) => {
    if (!checkedUsers.length) return;

    e.preventDefault();
    const mappedAddedUsers = checkedUsers.map(u => ({
      id: u.id,
      is_active: u.is_active,
      minutes: 0,
      name: u.name,
      is_full_time: u.is_full_time || true,
      userName: u.name,
      userId: u.id,
      projectId: currentProjectId,
      projectReportId: currentProjectReport.users.find(user => user.userId === u.id)?.projectReportId,
    }));
    
    setEditedTeam([...new Set(currentEditedTeam.concat(mappedAddedUsers))])
    setAddMember(false);

    const payload = checkedUsers.map(developer => ({
      user_id: developer.id,
      is_active: developer.is_active,
      is_full_time: developer.is_full_time || true,
      is_project_manager: false,
    }));

    setCheckedUsers([]);

    dispatch(addDeveloperToProject(payload))
    dispatch(getAllProjects())
  }, [checkedUsers, currentProjectId, currentProjectReport, currentEditedTeam, dispatch])

  const _changeUserOnProject = useCallback(
    (id, data) => {
      dispatch(changeUserOnProject({ id, data }))
    },
    [dispatch]
  );

  const deleteItem = useCallback((id) => {
    let res = currentEditedTeam.filter(e => e.projectReportId !== id);
    setEditedTeam(res);
    _changeUserOnProject(id, { is_active: false });

  }, [currentEditedTeam, _changeUserOnProject])

  const _getProjectReportById = useCallback(
    (data) => {
      dispatch(getProjectReportById(data))
    },
    [dispatch]
  )
  const _setSelectedProject = useCallback(
    (data) => {
      dispatch(setSelectedProject(data))
    },
    [dispatch]
  )

  const _downloadAllTeamProjectReport = useCallback(
    (data) => {
      dispatch(downloadAllTeamProjectReport(data))
    },
    [dispatch]
  )

  const setTypeWork = useCallback((userId, workType) => {
    let resArr = currentEditedTeam.map((e) => {
      if (userId === e.user_id || e.id) {
        e.is_full_time = workType
      }
      return e
    })

    setEditedTeam(resArr);
  }, [currentEditedTeam])

  useEffect(() => {
    if (show) {
      if (projectName) {
        setValuesFromApi({
          projectName: projectName,
          team: currentProjectActiveDevelopers,
          projectManager: activeProjectManager,
          total_minutes: currentApiProject.total_minutes,
          description: currentApiProject.description,
        });
      }

      setEditedTeam(currentProjectActiveDevelopers);
      setArchivedProject(currentApiProject?.is_archived || false)
    }
  },
    [
      projectName,
      currentProjectActiveDevelopers,
      activeProjectManager,
      currentApiProject,
      show,
    ],
  );

  useEffect(() => {
    if (show) {
      _getProjectReportById(currentProjectId);
      closeAddUser();
    }
  }, [_getProjectReportById, currentProjectId, show, month, currentEditedTeam])

  useEffect(() => {
    if (currentProject && show) {
      _setSelectedProject(currentProject);
    }
  }, [currentProject, show, _setSelectedProject]);

  const handleClose = useCallback(() => {
    resetForm();
    dispatch(setShowEditModal(false));
    setAddMember(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  let teamMList = currentEditedTeam?.map((e, i) => {
    return (
      <div key={e.id || i}>
        <TeamM
          isArchived={isArchivedProject}
          key={e.id || i}
          e={e}
          hovers={parseMinToHoursAndMin(e.minutes, true)}
          del={deleteItem}
          projectId={currentApiProject?.id}
          setWorkType={setTypeWork}
        />
      </div>
    )
  })
  
  const validate = (values) => {
    const errors = {}

    if (!values.projectName) {
      errors.projectName = 'You should enter project name'
    } else if (values.projectName.length > 30) {
      errors.projectName = 'Project name should be less then 30 symbols'
    }

    if (values.description && values.description.length > 1000) {
      errors.description = 'Description should be less then 1000 symbols'
    }
    return errors
  }

  const onSubmit = useCallback((values) => {
    dispatch(changeProjectName({
      id: currentProjectId,
      name: values.projectName,
    }))
  }, [currentProjectId,  dispatch]) ;

  const {
    handleChange,
    values,
    errors,
    touched,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: currentApiProject ? {
      projectName: currentApiProject?.name,
      description: currentApiProject?.description,
    } : {
      projectName: '',
      description: '',
    },
    onSubmit,
    validate,
  });

  const handleEnterPress = useCallback((e) => {
    e.stopPropagation();

    if (e.key === 'Enter' && !e.shiftKey) {
      if (e.target.id === 'projectName'
        && !errors?.projectName
        && values.projectName !== valuesFromApi?.projectName
      ) {
        dispatch(changeProjectName({
          id: currentProjectId,
          data : { name: values.projectName.trim() },
          title: 'name',
        }));
        setValuesFromApi((prev) => ({ ...prev, projectName: values.projectName.trim() }));
      } else if (
        e.target.id === 'description'
        && !errors?.description
        && values.description !== valuesFromApi?.description
      ) {
        dispatch(changeProjectName({
          id: currentProjectId,
          data : { description: values.description.trim() },
          title: 'description',
        }));
        setValuesFromApi((prev) => ({ ...prev, description: values.description.trim() }));
      }
      dispatch(getAllProjects())
    }
  }, [errors, currentProjectId, values, valuesFromApi, dispatch]);

  
  useEventListener('keyup', handleEnterPress);

  const handleLostFocus = useCallback((e) => {
    if (e.target.id === 'projectName'
    && !errors?.projectName
    && values.projectName !== valuesFromApi?.projectName
  ) {
    dispatch(changeProjectName({
      id: currentProjectId,
      data : { name: values.projectName.trim() },
      title: 'name',
    }));
    setValuesFromApi((prev) => ({ ...prev, projectName: values.projectName.trim() }));
  } else if (
    e.target.id === 'description'
    && !errors?.description
    && values.description !== valuesFromApi?.description
  ) {
    dispatch(changeProjectName({
      id: currentProjectId,
      data : { description: values.description.trim() },
      title: 'description',
    }));
    setValuesFromApi((prev) => ({ ...prev, description: values.description.trim() }));
    }
    dispatch(getAllProjects())
  }, [errors, currentProjectId, values, valuesFromApi, dispatch])

  useEffect(() => {
    setValues(currentApiProject ? {
      projectName: currentApiProject?.name,
      description: currentApiProject?.description,
    } : {
      projectName: '',
      description: '',
    });
  }, [currentApiProject, setValues, valuesFromApi]);


  const _addInactiveProjectManagerToProject = useCallback(
    (data) => {
      dispatch(addInactiveProjectManagerToProject(data))
    },
    [dispatch]
  );

  const _addProjectManagerToProject = useCallback(
    (data) => {
      dispatch(addProjectManagerToProject(data))
    },
    [dispatch]
  )

  const _addUsersOnProject = useCallback(
    (data) => {
      dispatch(addUsersOnProject({ data }))
    },
    [dispatch]
  )

  const handleAddProjectManagerToProject = (e) => {
    const targetUserId = e.target?.selectedOptions[0].dataset.id || e.id
    const isPm = projectManagersList.find(
      (pm) => pm.id === targetUserId
    )
    const wasDeactivated = deactivatedUsers?.find(
      (user) => user.user_id === targetUserId
    )
    const wasInTeam = values?.team?.find(
      (user) => user.user_id === targetUserId
    )
    if (activeProjectManager) {
      if (wasDeactivated) {
        const previousPm = {
          id: activeProjectManager.projectReportId,
          data : {
            is_active: false,
            is_project_manager: false,
          }
        }

        const newPm = {
          id: wasDeactivated.projectReportId,
          data : {
            is_active: true,
            is_project_manager: true,
          }
        }
        _addInactiveProjectManagerToProject({previousPm, newPm})
      } else if (wasInTeam) {
        dispatch(
          showAler({
            type: WARNING_ALERT,
            message: 'Project manager is already in the team',
            delay: 5000,
          })
        )
      } else {

        const previousPm = {
          id: activeProjectManager.projectReportId,
          data : {
            is_active: false,
            is_project_manager: false,
          }
        }

        const newPm = {
          project: currentProjectId,
          user: isPm.id,
          is_full_time: true,
          is_active: true,
          is_project_manager: true,
        }

        _addProjectManagerToProject({previousPm, newPm})
      }
    } else {
      if (wasDeactivated) {
        _changeUserOnProject(wasDeactivated.projectReportId, {
          is_active: true,
          is_project_manager: true,
        })
      } else if (wasInTeam) {
        dispatch(
          showAler({
            type: WARNING_ALERT,
            message: 'Project manager is already in the team',
            delay: 5000,
          })
        )
      } else {
        _addUsersOnProject({
          project: currentProjectId,
          user: isPm.id,
          is_full_time: true,
          is_active: true,
          is_project_manager: true,
        })
      }
    }
    dispatch(getAllProjects())
  }

  const handleArchivedPress = useCallback(() => {
    dispatch(changeProjectName({
      id: currentProjectId,
      data : { is_archived: !isArchivedProject },
      title: 'archived status',
    }));
    setArchivedProject(prev => !prev);
    dispatch(getAllProjects())
    handleClose()
  }, [currentProjectId, dispatch, handleClose, isArchivedProject]);

  const _handlerMouseEnter = useCallback(() => {
    setShowHintAddMember(true)
  }, [])

  const _handlerMouseLeave = useCallback(() => {
    setShowHintAddMember(false)
  }, [])

  return (
    <div
      ref={modalRef}
      className={'edit-modal-container ' + (show ? 'active' : '')}
    >
      <WindowInfo
        close={handleClose}
        title={valuesFromApi?.projectName}
        download={_downloadAllTeamProjectReport}
        onArchivedPress={handleArchivedPress}
        isProjectArchived={isArchivedProject}
        id={currentProjectId}
      >
        {isFetchingPMPage && <Spinner />}

        <Form
          onSubmit={(e) => {e.preventDefault()} }
        >

        <InfoItemM
          key="Project Name"
          icon={ProjectIcon}
          title={'PROJECT NAME'}
          isArchived={isArchivedProject}
          editValue={
            <Form.Group
              controlId="projectName"
              name="projectName"
              onChange={handleChange}
              onBlur={handleLostFocus}
              value={valuesFromApi?.projectName || values.projectName}
              className="search-manger"
            >
              <Form.Control
                type="projectName"
                defaultValue={valuesFromApi?.projectName || values.projectName}
                placeholder="Type project name ..."
                autoFocus
                tabIndex={1}
              />

                {errors.projectName && touched.projectName && (
                  <Form.Text className="text-danger error_message">
                    {errors.projectName}
                  </Form.Text>
                )}
            </Form.Group>
          }
          value={valuesFromApi?.projectName}
        />
        <InfoItemM
          key="Project Owner"
          icon={UserIcon}
          title={'PROJECT OWNER'}
          isArchived={isArchivedProject}
          editValue={
            <Select
              title={valuesFromApi?.projectManager?.name}
              listItems={freeProjectManagersList}
              onSelected={handleAddProjectManagerToProject}
              valueKey="name"
              idKey="id"
              extraClassContainer={' search search-manger'}
              initialChoice={valuesFromApi?.projectManager || activeProjectManager?.name}
            />
          }
          value={valuesFromApi?.projectManager?.name || activeProjectManager?.name}
        />
        <InfoItemM
          key="SPEND HOURS"
          icon={ChekMark}
          isArchived={isArchivedProject}
          title={'HOURS WORKED'}
          value={parseMinToHoursAndMin(valuesFromApi?.total_minutes, true)}
        />
        <InfoItemM
          key="Project Description"
          title={'DESCRIPTION'}
          icon={ProjectIcon}
          isArchived={isArchivedProject}
          editValue={
            <Form.Group
              controlId="description"
              name="description"
              onChange={handleChange}
              onBlur={handleLostFocus}
              value={valuesFromApi?.description || values.description}
              className="search-manger"
            >
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={valuesFromApi?.description || values.description}
                placeholder="Some info about the project"
                tabIndex={2}
                autoFocus
                onFocus={(e) =>
                  e.currentTarget.setSelectionRange(
                    e.currentTarget.value.length,
                    e.currentTarget.value.length
                  )}
              />

              {errors.description && touched.description && (
                <Form.Text className="text-danger error_message">
                  {errors.description}
                </Form.Text>
              )}
            </Form.Group>

          }
          value={valuesFromApi?.description || 'Some info about the project'}
          customClass={'project-description'}
        />
        </Form>
        <div className="projects_info">
          <div className="project_data">
            <div className="project_data_header">
              <span className="project_data_header-title edit_modal-team_name">DEVELOPER NAME</span>
              <span className="project_data_header-title edit_modal-team_occupancy">OCCUPANCY</span>
              <span className="project_data_header-title edit_modal-team_hours">HOURS</span>
            </div>
            <div className="team-container">{teamMList}</div>
            <div className="edit-control container">
              <div className="row">
                <div
                  className="col-5 add-new "
                  onClick={() => {
                    !isArchivedProject && (valuesFromApi?.projectManager  || activeProjectManager?.name) && setAddMember(!addMember)
                  }}
                >
                  <span
                    className={
                      'row align-items-center ' +
                      (addMember ? 'add-member' : '') +
                      (isArchivedProject ||  (!valuesFromApi?.projectManager || !activeProjectManager?.name)? 'half-opacity' : '')
                    }
                    onMouseEnter={() => {
                      (!valuesFromApi?.projectManager || !activeProjectManager?.name) && _handlerMouseEnter()
                    }}
                    onMouseLeave={() => {
                      (!valuesFromApi?.projectManager || !activeProjectManager?.name) && _handlerMouseLeave()
                    }}
                  >
                    {showHintAddMember && <HintWindow text={'Assign a Project manager to the project first'} />}  
                    <Plus isActive={addMember || isArchivedProject || (!valuesFromApi?.projectManager || !activeProjectManager?.name)} />
                    <span>Add new developers</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {addMember && (
            <AddSelectedM
              teamM={projectTeamM}
              closeAddUser={closeAddUser}
              checkedUsers={checkedUsers}
              setCheckedUsers={setCheckedUsers}
              addSelected={addSelected}
              currentTeamIds={currentTeamIds}
            />
          )}
        </div>
      </WindowInfo>
    </div>
  )
}

export default EditProjectModal
