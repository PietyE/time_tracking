import React from "react";
import Select from "../select"
import "./style.scss"

function Filter({type}){
    return <div className={"filter " +(type==='city'?'city':'') }>
        <Select/>
    </div>
}

export  default Filter;