import React, { memo } from 'react'

import Select from 'components/ui/select'

function FunnelSelect(props) {
    let {days, selectedDay, setStausDay}= props;

    return (
        <div className="funnel_select">
            <Select
                title="choose your project..."
                listItems={days}
                initialChoice={selectedDay}
                onSelected={setStausDay}
                valueKey="name"
                idKey="id"
                extraClassContainer={'funnel_select'}
            />
        </div>

    )
}

export default memo(FunnelSelect)
