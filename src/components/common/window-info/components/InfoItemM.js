import React from "react";


function InfoItemM({children}) {
    return <>
        <div className="div_info_row">
            <img src="/static/media/calendar-userData.b7cd0c61.svg" className="calendar"/>
            {children}
        </div>
        <div className="row2 grey"></div>
    </>
}

export default InfoItemM