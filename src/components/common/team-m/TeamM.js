import React, { useCallback, useEffect, useState } from 'react'
import './style.scss'
import DownloadIc from '../../../images/download_ic.svg'
import TrashGrayIc from '../../../images/trash_cray_ic.svg'
import { changeUserOnProject, downloadProjectReport } from '../../../actions/projects-management'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSelectedDateForPMSelector } from '../../../reducers/projects-management'

function TeamM({ e, del, d, hovers, setWorkType, isArchived}) {
  let [fulTime, setFullTime] = useState(e.is_full_time)
  const dispatch = useDispatch()
  let selectedData = useSelector(getSelectedDateForPMSelector)

  const _downloadProjectReport = useCallback(
    (data) => {
      dispatch(downloadProjectReport(data))
    },
    [dispatch]
  )

  const _changeUserOnProject = useCallback(
    (id, data) => {
      dispatch(changeUserOnProject({ id, data }))
    },
    [dispatch]
  );

  const handleOccupancyChange = useCallback((isFullTime) => () => {
    setFullTime(isFullTime);
    _changeUserOnProject(e.projectReportId, { is_full_time: isFullTime });
  }, [e])

  useEffect(() => {
    setWorkType && setWorkType(e.projectReportId, fulTime)
  }, [fulTime])

  let userId = e.id || e.user_id
  let developer_project_id = e?.projectReportId
  let selectedDate = selectedData
  let stateDataForLink = {
    userId,
    developer_project_id,
    selectedDate,
  }
  return (
    <form className=" team-m">
      <div className="container-team_modal">
        <div className={'avatar-cont'}>
          <img
            src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png"
            alt=""
            className={'team-m-avatar'}
          />
          <div>
            <h4 className="team-m-name">
              <Link
                to={{
                  pathname: '/timereport',
                  state: stateDataForLink,
                }}
              >
                {e.name}
              </Link>
            </h4>
            {d && <p className="team-m-email">{e.email}</p>}
          </div>
        </div>
        <div className={'team-m__type-work ' + (hovers ? 'flex-column' : '')}>
          <div className="label-def">
            <span>{fulTime ? 'Full-time' : 'Part-time'}</span>
          </div>
          <div className="team-m-input-cont">
            <label htmlFor={e.id || e.user_id}>
              <input
                name="w-type"
                type="radio"
                checked={!fulTime ? 'checked' : ''}
                id={e.id || e.user_id}
                onChange={handleOccupancyChange(false)}
                disabled={isArchived}
              />
              <span className="checkmark"></span>
              Part-time
            </label>
          </div>
          <div className="team-m-input-cont">
            <label htmlFor={e.id + 1 || e.user_id + 1}>
              <input
                name="w-type"
                type="radio"
                checked={fulTime ? 'checked' : ''}
                onChange={handleOccupancyChange(true)}
                id={e.id + 1 || e.user_id + 1}
                disabled={isArchived}
              />
              <span className="checkmark"></span>
              Full-time
            </label>
          </div>
        </div>
        {hovers && <div className="estimate-hours">{hovers}</div>}
        <div className="trash-cont">
          {!isArchived &&  <img
            className={'gray-trash'}
            onClick={() => {
              del(e.projectReportId)
            }}
            src={TrashGrayIc}
            alt=""
          />
          }
          <img
            className={'download'}
            onClick={() => {
              _downloadProjectReport(e.projectReportId)
            }}
            src={DownloadIc}
            alt=""
          />
        </div>
      </div>
    </form>
  )
}

export default TeamM
