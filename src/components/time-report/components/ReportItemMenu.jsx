import {
  faCheck,
  faEdit,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { FaExchangeAlt } from 'react-icons/fa'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getUserPermissions } from 'selectors/user'
import { userPermissions } from 'constants/permissions'
import '../style.scss'

// TODO: Refactor component with MUI and modular SCSS
export const ReportItemMenu = ({
  idEditingWorkItem,
  id,
  handlerCancelEditMode,
  handlerClickEditMode,
  isOneProject,
  handlerClickOpenDeleteModal,
  hanldeClickToggleShowModalChangeProject,
}) => {
  const permissions = useShallowEqualSelector(getUserPermissions)
  return (
    <div className={'time_report_day_menu'}>
      {permissions?.includes(userPermissions.work_items_change_workitem) && (
        <button
          onClick={idEditingWorkItem === id ? () => null : handlerClickEditMode}
          className="button edit_button"
          type={idEditingWorkItem === id ? 'submit' : 'button'}
          form="edit_form"
        >
          <FontAwesomeIcon
            icon={idEditingWorkItem === id ? faCheck : faEdit}
            className="icon pencil_icon"
          />
          Edit the report
        </button>
      )}
      {idEditingWorkItem !== id && isOneProject && (
        <button
          onClick={hanldeClickToggleShowModalChangeProject}
          className="button change_project_button"
          type={'button'}
          form="edit_form"
        >
          <FaExchangeAlt className="icon exchange_icon" />
          Swap to other project
        </button>
      )}
      {permissions?.includes(userPermissions.work_items_delete_workitem) && (
        <button
          onClick={
            idEditingWorkItem === id
              ? handlerCancelEditMode
              : handlerClickOpenDeleteModal
          }
          className="button delete_button"
        >
          <FontAwesomeIcon
            icon={idEditingWorkItem === id ? faTimes : faTrashAlt}
            className="icon trash_icon"
          />
          Delete the report
        </button>
      )}
    </div>
  )
}
