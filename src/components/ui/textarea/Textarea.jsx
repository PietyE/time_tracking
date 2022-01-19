import React from "react";



function Textarea({placeholer, value=''}) {
    return(
        <div>
            <textarea placeholder={placeholer}  defaultValue={value}/>

        </div>
    )
}

export default Textarea;