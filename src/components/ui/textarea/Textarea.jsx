import React from "react";



function Textarea({placeholder,value='', setDescription, customClass }) {
    return(
        <div>
            <textarea placeholder={placeholder}
                      className={customClass}
                      onChange={(e)=>{setDescription(e.target.value)}}
                      defaultValue={value}/>
        </div>
    )
}

export default Textarea;