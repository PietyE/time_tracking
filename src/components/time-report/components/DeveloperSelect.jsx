import React, { memo } from 'react'
import { connect } from 'react-redux'

import { selectDevelopers } from 'actions/developers'

import Select from 'components/ui/select'

function DeveloperSelect({
  developersList,
  selectDevelopers,
  selectedDeveloper,
}) {
  return (
    <Select
      title="choose developer..."
      listItems={developersList}
      onSelected={selectDevelopers}
      valueKey="name"
      idKey="id"
      extraClassContainer={'developer_select'}
      initialChoice={selectedDeveloper}
      isSearch
    />
  )
}

const actions = { selectDevelopers }

export default memo(connect(null, actions)(DeveloperSelect))
