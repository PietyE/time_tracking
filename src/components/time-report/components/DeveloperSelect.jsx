import React, { useEffect, memo } from 'react'
import { connect } from 'react-redux'

import Select from 'components/ui/select'

function DeveloperSelect() {
  return (
    <Select
      title="choose developer..."
      listItems={[]}
      onSelected={null}
      valueKey="name"
      idKey="developer_id"
      extraClassContainer={'developer_select'}
    />
  )
}

export default DeveloperSelect
