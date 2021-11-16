import React from "react";
import Select from "../select"
import "./style.scss"

function DeveloperFilter({type}){
    return <div className={"developer-filter " +(type==='city'?'city':'') }>
        <Select/>
    </div>
}

export  default DeveloperFilter;