import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'

import { getAllProjects } from 'actions/projects-management';

function InfoItemM({ icon, title, value, editValue, isArchived, customClass = ''}) {
    const [isEdit, setEdit] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        setEdit(false)
    }, [value])

    const handleBlur = (e) => {
        dispatch(getAllProjects())
        setEdit(false);   
    }
    return <>
        <div
          id="Form Control Item"
          className={'div_info_row ' + customClass}
          onClick={() => {!isArchived && setEdit(true)}}
          onBlur={() => {!isArchived && handleBlur()}}
        >
            <div>
                <img src={icon || '/static/media/calendar-userData.b7cd0c61.svg'} className="calendar" alt='calendar'/>
                <span className="info_text">{title}</span>
            </div>
            {!isEdit || !editValue?
                <span id="Non Edit Data" className="info_data">{value}</span>
                :
                <span id="Edit Data" className="info_data info_data_focus">{editValue}</span>
            }
        </div>
        <div className="row2 grey"></div>
    </>
}

export default InfoItemM;
