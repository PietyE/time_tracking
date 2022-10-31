import React, { useState } from 'react'
import './style.scss'
import Search from 'components/ui/search/Search'
import CheckItem from './component/CheckItem'
import { Typography } from '@material-ui/core'

function AddSelectedM({
  teamM,
  location,
  checkedUsers,
  setCheckedUsers,
  addSelected,
  closeAddUser,
  customClass,
  currentTeamIds,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const teamMList = teamM
    ?.filter((e) => !currentTeamIds.includes(e.id))
    .filter((val) => {
      if (searchTerm === '') {
        return val
      } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val
      }
      return
    })
    .map((e) => {
      if (e) {
        return (
          <CheckItem
            key={e.id || e.user_id}
            checkedUsers={checkedUsers}
            setCheckedUsers={setCheckedUsers}
            e={e}
          />
        )
      }
      return
    })

  const renderUsers = teamMList.length ? (
    teamMList
  ) : (
    <Typography>User not found</Typography>
  )

  return (
    <div>
      <div
        className={
          'add-selected ' +
          (location ? 'members ' : '') +
          (customClass ? customClass : '')
        }
      >
        <Search setSearchTerm={setSearchTerm} />
        <div className="check-items-box">{renderUsers}</div>
        <div className="btn-cont">
          <div className="d-flex justify-content-center">
            <button className="btn btn-add" onClick={addSelected}>
              Add selected
            </button>
            <button className="btn btn-cancel" onClick={closeAddUser}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddSelectedM
