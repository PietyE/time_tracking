import React from "react";


import "./style.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleUp} from "@fortawesome/free-solid-svg-icons";



function ArrowUp() {
    return (
      <div
        className="arrow-up active "
        onClick={() => window.scrollTo(0, 0)}
      >
        <FontAwesomeIcon
          icon={faArrowAltCircleUp}
          className="icon pencil_icon"
        />
      </div>
    )
}

export default ArrowUp
