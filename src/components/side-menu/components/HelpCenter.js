import React from 'react'
import { Link } from 'react-router-dom'


const HelpCenter = (props) => {
    const { img } = props;

    return(
      <Link to="helpcenter" style={{ textDecoration: 'none' }}>
        <div className="sidebar_menu_button">
            <img src={img} alt="Help center" className="sidebar_img"/>
            <span className="item">Help center</span>
        </div>
      </Link>
    )
}

export default HelpCenter;