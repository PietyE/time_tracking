import React, { useCallback, useEffect, useState } from 'react'
import WindowInfo from '../../common/window-info/WindowInfo'
import InfoItemM from '../../common/window-info/components/InfoItemM'
import TeamM from '../../common/team-m/TeamM'
import Plus from '../../ui/plus'
import AddSelectedM from '../../common/AddSelectedM/AddSelectedM'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeProjectName,
  downloadAllTeamProjectReport,
  getProjectReportById,
  setPm,
  setSelectedProject,
  setShowEditModal,
} from '../../../actions/projects-management'
import {
  getActiveDevSelector,
  getActivePmInCurrentProjectSelector,
  getCurrentProjectSelector, getIsFetchingPmPageSelector,
  getProjectManagerListSelector,
  getProjectName,
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

function EditProjectModal2({ show }) {
  const currentProjectActiveDevelopers = useSelector(
    getActiveDevSelector,
    isEqual
  )
  const projects = useSelector(getProjectsSelector, isEqual)

  let [addMember, setAddMember] = useState(false)
  const [checkedUsers, setCheckedUsers] = useState([])
  const [currentEditedTeam, setEditedTeam] = useState([])
  const [selectedProject, setSelectedPr] = useState({})
  const [selectedOwner, setSelectedOwner] = useState({})

  const currentProjectId = useSelector(getSelectedProjectIdSelector, isEqual)
  const currentProject = useSelector(getSelectedProjectSelector, isEqual)
  const currentApiProject = useSelector(getCurrentProjectSelector, isEqual)
  const projectName = useSelector(getProjectName, isEqual)
  const isFetchingPMPage = useSelector(getIsFetchingPmPageSelector, isEqual)

  const projectManagersList = useSelector(
    getProjectManagerListSelector,
    isEqual
  )
  const activeProjectManager = useSelector(
    getActivePmInCurrentProjectSelector,
    isEqual
  )


  const [valuesFromApi, setValuesFromApi] = useState(null)
  const projectTeamM = useSelector(getUsersSelector)
  const closeAddUser = () => {
    setAddMember(false)
  }

  const addSelected = (e) => {
    e.preventDefault()
    setEditedTeam([...new Set(currentEditedTeam.concat(checkedUsers))])
    setAddMember(false)
  }

  const deleteItem = (id) => {
    let res = currentEditedTeam.filter((e) => {
      if (e.user_id !== id && e.id !== id) {
        return e
      }
    })
    setEditedTeam(res)
  }

  const dispatch = useDispatch()

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

    setEditedTeam(resArr)
  }, [])

  useEffect(() => {
    if (projectName) {
      setValuesFromApi({
        projectName: projectName,
        team: currentProjectActiveDevelopers,
        projectManager: activeProjectManager,
        total_minutes: currentApiProject.total_minutes,
        description: currentApiProject.description,
      });
    }

    setEditedTeam(currentProjectActiveDevelopers)
  }, [projectName, currentProjectActiveDevelopers, activeProjectManager])

  useEffect(() => {
    if (show) {
      if (!currentProject) {
        _getProjectReportById(currentProjectId);
      }
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
      <div key={e.user_id || i}>
        <TeamM
          key={e.user_id || i}
          e={e}
          hovers={'120h 50m'}
          del={deleteItem}
          projectId={currentApiProject.id}
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

    if (e.key === 'Enter') {
      if (e.target.id === 'projectName'
        && !errors?.projectName
        && values.projectName !== valuesFromApi?.projectName
      ) {
        dispatch(changeProjectName({
          id: currentProjectId,
          data : { name: values.projectName.trim() },
          title: 'name',
        }));
        setValuesFromApi((prev) => ({ ...prev, projectName: values.projectName }));
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
        setValuesFromApi((prev) => ({ ...prev, description: values.description }));
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

  // const _changeProjectName = useCallback(
  //   (id, data) => {
  //     dispatch(changeProjectName({ id, data }))
  //   },
  //   [dispatch]
  // )
  // const _changeUserOnProject = useCallback(
  //   (id, data) => {
  //     dispatch(changeUserOnProject({ id, data }))
  //   },
  //   [dispatch]
  // )

  return (
    <div className={'edit-modal-container ' + (show ? 'active' : '')}>
      <WindowInfo
        close={handleClose}
        title={valuesFromApi?.projectName}
        download={_downloadAllTeamProjectReport}
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
          editValue={
            <Form.Group
              controlId="projectName"
              name="projectName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.projectName}
              className="search-manger"
            >
              {/*<Form.Label>Email address</Form.Label>*/}
              <Form.Control
                // className={styles.emailInput}
                type="projectName"
                defaultValue={values.projectName}
                placeholder="Type project name ..."
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
          editValue={
            <Select
              title={valuesFromApi?.projectManager?.name}
              listItems={projectManagersList}
              onSelected={onSelectPm}
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
          title={'LAST SINCE'}
          value={parseMinToHoursAndMin(valuesFromApi?.total_minutes, true)}
        />
        <InfoItemM
          key="Project Description"
          title={'DESCRIPTION'}
          icon={ProjectIcon}
          editValue={
            <Form.Group
              controlId="description"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              className="search-manger"
            >
              {/*<Form.Label>Email address</Form.Label>*/}
              <Form.Control
                // className={styles.emailInput}
                as="textarea"
                rows={3}
                defaultValue={values.description}
                placeholder="Some info about the project"
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
                    setAddMember(!addMember)
                  }}
                >
                  <span
                    className={
                      'row align-items-center ' +
                      (addMember ? 'add-member' : '')
                    }
                  >
                    <Plus isActive={addMember} />
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
            />
          )}
        </div>
      </WindowInfo>
    </div>
  )
}

export default EditProjectModal2
