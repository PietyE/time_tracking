import React, {useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import HintWindow from 'components/ui/HintWindow';


const HelpCenter = (props) => {
  const { img } = props;

  const [showHint, setShowHint] = useState(false)

  const sideMenuContainer = useRef()
  const sideMenuWidth = sideMenuContainer.current?.clientWidth;
  const WIDTH_SIDE_MENU = 78
  
    return(
      <Link to="helpcenter" style={{ textDecoration: 'none' }}>
        <div
            ref={sideMenuContainer}
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
            className="sidebar_menu_button">
          <img src={img} alt="Help center" className="sidebar_img" />
          {(showHint && sideMenuWidth === WIDTH_SIDE_MENU) && <HintWindow text={"Help center"} />}
            <span className="item">Help center</span>
        </div>
      </Link>
    )
}

export default HelpCenter;