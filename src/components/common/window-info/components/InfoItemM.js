import React, {useState} from "react";


function InfoItemM({ icon, title, value, editValue, customClass}) {
    const [isEdit, setEdit] = useState(false);
    return <>
        <div className={'div_info_row ' + customClass} onClick={()=>setEdit(true)}>
            <div>
                <img src={icon || '/static/media/calendar-userData.b7cd0c61.svg'} className="calendar"/>
                <span className="info_text">{title}</span>
            </div>
            {!isEdit || !editValue?
                <span className="info_data">{value}</span>
                :
                <span className="info_data">{editValue}</span>
            }
        </div>
        <div className="row2 grey"></div>
    </>
}

export default InfoItemM