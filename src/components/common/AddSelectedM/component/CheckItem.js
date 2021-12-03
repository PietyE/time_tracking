import React, {useState} from "react";


function CheckItem({e, checkedUsers, setCheckedUsers}) {
    let [checked, setChecked]=useState(false);

    const isChecked = ()=>{
        if(!checked){
            setCheckedUsers([...checkedUsers, e])
        }else{
            setCheckedUsers(checkedUsers.filter(elem=>elem!==e))
        }
    }
    const change = ()=>{
        setChecked(!checked);
        setTimeout(()=>{
            isChecked()
        },10);
    }

    return <div className={'check-item '+(checked ? 'checked':'')}>
        <label htmlFor={e ? e.id : ""}>
            <input type="checkbox" id={e ? e.id : ""} checked={checked}
                   onChange={ change}/>
            <span className="checkmark"></span>
           <span className="check-item-name">{e?e.name : ""}</span>
        </label>
    </div>
}

export default CheckItem