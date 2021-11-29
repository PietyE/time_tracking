import React, {useState} from "react";


function CheckItem() {
    let [checked, setChecked]=useState(false)

    return <div className={'check-item '+(checked ? 'checked':'')}>
        <label htmlFor="uItem">
            <input type="checkbox" id="uItem" checked={checked}
                   onChange={() => setChecked(!checked)}/>
            <span className="checkmark"></span>
           <span className="check-item-name">gdd</span>
        </label>
    </div>
}

export default CheckItem