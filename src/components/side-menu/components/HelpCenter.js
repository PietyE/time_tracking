import React, {  } from 'react'


const HelpCenter = (props) => {
    const { img } = props;

    return(
        <div className="sidebar_menu_button">
            <img src={img} alt="Help center" className="sidebar_img"/>
            <span className="item">Help center</span>
        </div>
    )
}

export default HelpCenter;