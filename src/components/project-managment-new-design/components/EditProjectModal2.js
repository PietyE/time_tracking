import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import WindowInfo from '../../common/window-info/WindowInfo'
import InfoItemM from '../../common/window-info/components/InfoItemM'
import TeamM from '../../common/team-m/TeamM'
import Plus from '../../ui/plus'
import AddSelectedM from '../../common/AddSelectedM/AddSelectedM'
import { useDispatch, useSelector } from 'react-redux'
import {
  addInactiveProjectManagerToProject, addProjectManagerToProject, addUsersOnProject,
  changeProjectName, changeUserOnProject,
  downloadAllTeamProjectReport,
  getProjectReportById,
  setPm,
  setSelectedProject,
  setShowEditModal,
} from '../../../actions/projects-management'
import {
  getActiveDevSelector,
  getActivePmInCurrentProjectSelector,
  getCurrentProjectSelector, getDeactivatedMembersSelector, getIsFetchingPmPageSelector,
  getProjectManagerListSelector,
  getProjectName, getProjectReportByIdSelector,
  getSelectedProjectIdSelector,
  getSelectedProjectSelector,
  getUsersSelector,
} from '../../../reducers/projects-management'
import { isEqual } from 'lodash'
import { getProjectsSelector } from '../../../selectors/developer-projects'

import ChekMark from '../../../images/check-mark1.svg'
import UserIcon from '../../../images/user1.svg'
import ProjectIcon from '../../../images/card-text1.svg'
import { parseMinToHoursAndMin } from '../../../utils/common'
import Select from '../../ui/select'
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import Spinner from '../../time-report/components/Spinner'
import useEventListener from '../../../custom-hook/useEventListener'
import { showAler } from '../../../actions/alert'
import { WARNING_ALERT } from '../../../constants/alert-constant'
import useEqualSelector from '../../../custom-hook/useEqualSelector'

function EditProjectModal2({ show }) {
  const modalRef = useRef(null);
  const [addMember, setAddMember] = useState(false)
  const [checkedUsers, setCheckedUsers] = useState([])
  const [currentEditedTeam, setEditedTeam] = useState([])
  const [isArchivedProject, setArchivedProject] = useState(false)
  const [selectedProject, setSelectedPr] = useState({})
  const [selectedOwner, setSelectedOwner] = useState({})

  const projectManagersList = useEqualSelector(getProjectManagerListSelector)
  const activeProjectManager = useEqualSelector(getActivePmInCurrentProjectSelector);

  const deactivatedUsers = useEqualSelector(getDeactivatedMembersSelector)
  const currentProjectId = useEqualSelector(getSelectedProjectIdSelector)
  const currentProjectReport = useEqualSelector(
    state => getProjectReportByIdSelector(state, currentProjectId),
  );

  const currentProjectActiveDevelopers = useMemo(
    () => currentProjectReport?.users
      .filter(e => e.is_active && e.userName !== activeProjectManager?.name)
      .map(e => ({...e, name: e.userName, id: e.userId})) || [],
    [currentProjectReport, activeProjectManager]);

  const currentTeamIds = useMemo(
    () => currentProjectActiveDevelopers.map(e => e.id),
    [currentProjectActiveDevelopers],
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
    e.preventDefault()
    setEditedTeam([...new Set(currentEditedTeam.concat(checkedUsers))])
    setAddMember(false);

    if (checkedUsers.length) {
      const addedUsers = checkedUsers.map(e => e.id);

      _addUsersOnProject({
        project: [currentProjectId],
        user: addedUsers,
        is_full_time: true,
        is_active: true,
        is_project_manager: false,
      })
    }
  }, [checkedUsers])

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

  const onSelectPm = useCallback((data) => {
    dispatch(setPm(data))
    setSelectedOwner(data)
  })

  const onSelectProject = useCallback((data) => {
    setSelectedPr(data)
  })

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
  }, [currentEditedTeam, _changeUserOnProject])

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
      modalRef && modalRef.current.scrollIntoView();
    }
  }, [show, currentProjectId]);

  useEffect(() => {
    if (show) {
      // if (!currentProject) {
        _getProjectReportById(currentProjectId);
      // }
    }
  }, [_getProjectReportById, currentProjectId, show])

  useEffect(() => {
    if (currentProject && show) {
      _setSelectedProject(currentProject);
    }
  }, [currentProject, show]);

  const handleClose = () => {
    resetForm();
    dispatch(setShowEditModal(false));
  }

  let teamMList = currentEditedTeam?.map((e, i) => {
    return (
      <div key={e.id || i}>
        <TeamM
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

    if (values.description && values.description.length > 100) {
      errors.description = 'Description should be less then 100 symbols'
    }
    return errors
  }

  const onSubmit = useCallback((values) => {
    dispatch(changeProjectName({
      id: currentProjectId,
      name: values.projectName,
    }))
  }, [currentProjectId, changeProjectName]) ;

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isValid,
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
    }
  }, [errors, currentProjectId, values]);


  useEventListener('keyup', handleEnterPress);

  useEffect(() => {
    setValues(currentApiProject ? {
      projectName: currentApiProject?.name,
      description: currentApiProject?.description,
    } : {
      projectName: '',
      description: '',
    });

  }, [valuesFromApi]);


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
  }

  const handleArchivedPress = useCallback(() => {
    dispatch(changeProjectName({
      id: currentProjectId,
      data : { is_archived: !isArchivedProject },
      title: 'archived status',
    }));

    setArchivedProject(prev => !prev);
  }, [currentProjectId, isArchivedProject]);

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
        id={currentProjectId}
      >
        {isFetchingPMPage && <Spinner />}

        <Form
          onSubmit={(e) => {e.preventDefault()} }
            // handleSubmit}
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
              onBlur={handleBlur}
              value={valuesFromApi?.projectName || values.projectName}
              className="search-manger"
            >
              {/*<Form.Label>Email address</Form.Label>*/}
              <Form.Control
                // className={styles.emailInput}
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

            // <Select
            //   title={valuesFromApi?.projectName}
            //   listItems={projects}
            //   onSelected={onSelectProject}
            //   valueKey="name"
            //   idKey="id"
            //   extraClassContainer={' search search-manger'}
            //   initialChoice={currentApiProject}
            // />
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
              listItems={projectManagersList}
              onSelected={handleAddProjectManagerToProject}
              valueKey="name"
              idKey="id"
              extraClassContainer={' search search-manger'}
              initialChoice={valuesFromApi?.projectManager}
            />
          }
          value={valuesFromApi?.projectManager?.name}
        />
        <InfoItemM
          key="SPEND HOURS"
          icon={ChekMark}
          isArchived={isArchivedProject}
          title={'LAST SINCE'}
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
              onBlur={handleBlur}
              value={valuesFromApi?.description || values.description}
              className="search-manger"
            >
              {/*<Form.Label>Email address</Form.Label>*/}
              <Form.Control
                // className={styles.emailInput}
                as="textarea"
                rows={3}
                defaultValue={valuesFromApi?.description || values.description}
                placeholder="Some info about the project"
                autoFocus
                tabIndex={2}
              />

              {errors.description && touched.description && (
                <Form.Text className="text-danger error_message">
                  {errors.description}
                </Form.Text>
              )}
            </Form.Group>

            // <Textarea
            //   placeholder={'Some info about the project'}
            //   value={description}
            //   customClass={'projectDescription'}
            //   setDescription={setDescription}
            // />
          }
          value={valuesFromApi?.description || 'Some info about the project'}
          customClass={'project-description'}
        />
        </Form>
        <div className="projects_info">
          <div className="project_data">
            <div className="project_data_header">
              <span className="headers project edit_modal-team_title">DEVELOPER NAME</span>
              <span className="headers edit_modal-team_title">OCCUPANCY</span>
              <span className="headers edit_modal-team_title">HOURS</span>
            </div>
            <div className="team-container">{teamMList}</div>
            <div className="edit-control container">
              <div className="row">
                <div
                  className="col-5 add-new "
                  onClick={() => {
                    !isArchivedProject && setAddMember(!addMember)
                  }}
                >
                  <span
                    className={
                      'row align-items-center ' +
                      (addMember ? 'add-member' : '') +
                      (isArchivedProject ? 'half-opacity' : '')
                    }
                  >
                    <Plus isActive={addMember || isArchivedProject} />
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

export default EditProjectModal2
