import React from "react";



function Textarea({placeholer, value='', formik}) {
    return(
        <div>
            <textarea placeholder={placeholer} name='projectDescription' onChange={formik.handleChange} defaultValue={formik.values.projectDescription}/>

        </div>
    )
}

export default Textarea;