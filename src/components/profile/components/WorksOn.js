import React from "react";
import Project from "./Project";

function WorksOn(){
    return<div className="profile__container works-on">
        <h4 className="profile__container-title small" >Works on</h4>
        <div>
            <Project/>
            <Project/>
        </div>
    </div>
}

export default WorksOn