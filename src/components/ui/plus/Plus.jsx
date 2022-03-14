import React from "react";


import "./style.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";



function Plus({isActive, showUList}) {
    return<div className={"plus "+(!isActive ? "active":"")} onClick={showUList}>
            <FontAwesomeIcon
                icon={faPlus}
                className="icon pencil_icon"
            />
        </div>

}

export default Plus