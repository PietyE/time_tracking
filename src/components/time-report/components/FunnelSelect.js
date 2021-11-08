import React, { memo } from 'react'

import Select from 'components/ui/select'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisV, faFilter, faFingerprint} from "@fortawesome/free-solid-svg-icons";

function FunnelSelect(props) {
    let {days, selectedDay, setStausDay}= props;

    return (
        <div className="funnel_select">
            {/*<FontAwesomeIcon*/}
            {/*    icon={faFilter}*/}
            {/*    color="#fff"*/}
            {/*    className="icon pencil_icon"*/}
            {/*/>*/}
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
