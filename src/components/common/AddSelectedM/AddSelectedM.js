import React, {useEffect} from "react";
import "./style.scss"
import Search from "../../ui/search/Search";
import CheckItem from "./component/CheckItem";


function AddSelectedM({teamM, location, checkedUsers, setCheckedUsers}) {

    const teamMList = teamM.map((e)=>{
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
        <form className={'add-selected '+(location?'members':'') }>
            <Search/>
            <div className="check-items-box">
                {teamMList}
            </div>
            <div className={'btn-cont'}>
                <div className="row justify-content-center">
                    <button className='btn btn-add'>Add selected</button>
                    <button  className='btn btn-cancel'>Cancel</button>
                </div>
            </div>
        </form>
    </div>
}

export default AddSelectedM;