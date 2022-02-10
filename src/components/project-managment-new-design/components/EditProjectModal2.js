import React, { useCallback, useEffect, useState } from 'react'
import WindowInfo from '../../common/window-info/WindowInfo'
import InfoItemM from '../../common/window-info/components/InfoItemM'
import TeamM from '../../common/team-m/TeamM'
import Plus from '../../ui/plus'
import AddSelectedM from '../../common/AddSelectedM/AddSelectedM'
import { useDispatch, useSelector } from 'react-redux'
import {
  downloadAllTeamProjectReport,
  getProjectReportById,
  setPm,
  setSelectedProject,
  setShowEditModal,
} from '../../../actions/projects-management'
import {
  getActiveDevSelector,
  getActivePmInCurrentProjectSelector,
  getCurrentProjectSelector,
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
import Textarea from '../../ui/textarea'

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
  const [description, setDescription] = useState('')

  const currentProjectId = useSelector(getSelectedProjectIdSelector, isEqual)
  const currentProject = useSelector((getSelectedProjectSelector, isEqual))
  const currentApiProject = useSelector(getCurrentProjectSelector, isEqual)
  const projectName = useSelector(getProjectName, isEqual)

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

  const _submitEditData = () => {
    return {
      project: selectedProject,
      description: description,
      projectManager: selectedOwner,
      team: currentEditedTeam,
    }
  }

  const setTypeWork = useCallback((userId, workType) => {
    let resArr = currentEditedTeam.map((e) => {
      if (userId === e.user_id || e.id) {
        e.is_full_time = workType
      }
      return e
    })

    setEditedTeam(resArr)
  })

  useEffect(() => {
    if (projectName) {
      setValuesFromApi({
        projectName: projectName,
        team: currentProjectActiveDevelopers,
        projectManager: activeProjectManager,
        total_minutes: currentApiProject.total_minutes,
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

  const handleClose = () => dispatch(setShowEditModal(false))

  window.addEventListener('keyup', (e) => {
    if (
      e.key === 'Enter' &&
      !e?.target?.classList?.contains('projectDescription')
    ) {
      console.log('edit data', _submitEditData())
    }
  })

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

  return (
    <div className={'edit-modal-container ' + (show ? 'active' : '')}>
      <WindowInfo
        close={handleClose}
        title={valuesFromApi?.projectName}
        download={_downloadAllTeamProjectReport}
        id={currentProjectId}
      >
        <InfoItemM
          icon={ProjectIcon}
          title={'PROJECT NAME'}
          editValue={
            <Select
              title={valuesFromApi?.projectName}
              listItems={projects}
              onSelected={onSelectProject}
              valueKey="name"
              idKey="id"
              extraClassContainer={' search search-manger'}
              initialChoice={currentApiProject}
            />
          }
          value={valuesFromApi?.projectName}
        />
        <InfoItemM
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
          icon={ChekMark}
          title={'LAST SINCE'}
          value={parseMinToHoursAndMin(valuesFromApi?.total_minutes, true)}
        />
        <InfoItemM
          title={'DESCRIPTION'}
          icon={ProjectIcon}
          editValue={
            <Textarea
              placeholder={'Some info about the project'}
              value={description}
              customClass={'projectDescription'}
              setDescription={setDescription}
            />
          }
          value={'Some text...'}
          customClass={'project-description'}
        />

        <div className="projects_info">
          <div className="project_data">
            <div className="project_data_header">
              <span className="headers project">DEVELOPER NAME</span>
              <span className="headers">OCCUPANCY</span>
              <span className="headers">HOURS</span>
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
