import React, { useEffect, useState } from "react";


function InfoItemM({ icon, title, value, editValue, customClass = ''}) {
    const [isEdit, setEdit] = useState(false);
    useEffect(() => {
        setEdit(false)
    }, [value])

    return <>
        <div
          id="Form Control Item"
          className={'div_info_row ' + customClass}
          onClick={() => {setEdit(true)}}
          onBlur={() => {setEdit(false)}}
        >
            <div>
                <img src={icon || '/static/media/calendar-userData.b7cd0c61.svg'} className="calendar"/>
                <span className="info_text">{title}</span>
            </div>
            {!isEdit || !editValue?
                <span id="Non Edit Data" className="info_data">{value}</span>
                :
                <span id="Edit Data" className="info_data" >{editValue}</span>
            }
        </div>
        <div className="row2 grey"></div>
    </>
}

export default InfoItemM;
