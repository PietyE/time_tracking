import React from "react";
import "./style.scss"
import Search from "../../ui/search/Search";
import CheckItem from "./component/CheckItem";


function AddSelectedM({teamM}) {
    const teamMList = teamM.map((e)=>{
       return <CheckItem key={e.id} e={e} />
    });
    return<div>
        <form className="add-selected ">
            <Search/>
            <div className="check-items-box">
                <CheckItem/>
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