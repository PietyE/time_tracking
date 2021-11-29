import React from "react";


import "./style.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";



function Plus({isActive}) {
    return<div className={"plus "+(isActive ? "active":"")}>
            <FontAwesomeIcon
                icon={faPlus}
                className="icon pencil_icon"
            />
        </div>

}

export default Plus