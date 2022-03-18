import React, { memo } from 'react'

import Select from 'components/ui/select'

function ActivitySelect(props) {
    let {statuses, selectedStatus,  setUserStatus}= props;
    return (
        <Select
            valueKey="name"
            idKey="id"
            extraClassContainer={'activity_select'}
            onSelected={ setUserStatus}
            listItems={statuses}
            initialChoice={selectedStatus}
        />
    )
}

export default memo(ActivitySelect)