import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Scrollbar from 'react-scrollbars-custom'

import Select from 'components/ui/select'

function ProjectSelect({ menuList = [] }) {
  const menuListOnlyName = menuList.map(item => item.name)
  return (
    <div className="project_select_container">
      <Select title="choose you project..." listItems={menuListOnlyName} />
    </div>
  )
}

export default ProjectSelect
