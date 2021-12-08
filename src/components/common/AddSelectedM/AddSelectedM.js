import React, {useEffect, useState} from "react";
import "./style.scss"
import Search from "../../ui/search/Search";
import CheckItem from "./component/CheckItem";


function AddSelectedM({teamM, location, checkedUsers, setCheckedUsers, addSelected, closeAddUser}) {
    const [searchTerm, setSearchTerm] = useState("")
    const teamMList = teamM?.filter((val)=>{
        if(searchTerm ==""){
            return val;
        }else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return  val;
        }
    }).map((e)=>{
        if(e){
            return <CheckItem
                key={e.id}
                checkedUsers={checkedUsers}
                setCheckedUsers={setCheckedUsers}
                e={e}
            />;
        }
    });
    return<div>
        <div className={'add-selected '+(location?'members':'') }>
            <Search setSearchTerm={setSearchTerm} />
            <div className="check-items-box">
                {teamMList}
            </div>
            <div className={'btn-cont'}>
                <div className="row justify-content-center">
                    <button className='btn btn-add' onClick={addSelected}>Add selected</button>
                    <button  className='btn btn-cancel' onClick={closeAddUser}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
}

export default AddSelectedM;