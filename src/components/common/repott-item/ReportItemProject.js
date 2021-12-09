import React, {useEffect, useState} from "react";

import "./style.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArchive, faCheck, faEllipsisV, faTimes} from "@fortawesome/free-solid-svg-icons";
import {faEdit, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import Archive from "../../../images/archive1.svg"
import {closeEditMenu, parseMinToHoursAndMin} from "../../../utils/common";


function ReportItemProject({p, openEditModal}) {

    let [isEdit, setIsEdit] = useState(false)

    let toggleEdit = ()=>{
        setIsEdit(!isEdit)
    }

    useEffect(()=>{
        closeEditMenu(isEdit, setIsEdit)
    },[isEdit])

    return <div className="row report__item">
        <div className="col-lg-5">
            <span className='report__item-title'>
                {p.name}
            </span>
        </div>
        <div className="col-lg-2">
            150h 0m
        </div>
        <div className="col-lg-3">
            {parseMinToHoursAndMin(p.total_minutes,true)}
        </div>
        <div className="col-lg-2">
            <div className="row justify-content-end">
                <div className={'edit_dots '} onClick={toggleEdit}>
                    <FontAwesomeIcon
                        icon={faEllipsisV}
                        color="#414141"
                        className="icon pencil_icon"
                    />
                </div>
                {
                    isEdit &&
                    <div className={'menu'}>
                        <button
                            className="button edit_button"
                            type={'button'}
                            form="edit_form"
                            onClick={()=>{openEditModal(p.id)}}
                        >
                            <FontAwesomeIcon
                                icon={ faEdit}
                                className="icon pencil_icon"
                            />
                            Edit
                        </button>
                        <button
                            className="button"
                            type={'button'}
                            form="edit_form"
                        >
                            <img src={Archive} alt="" className={'archive'}/>
                            Archive
                        </button>
                        <button
                            className="button delete_button"
                        >
                            <FontAwesomeIcon
                                icon={ faTrashAlt}
                                className="icon trash_icon"
                            />
                            Delete
                        </button>
                    </div>
                }

            </div>
        </div>
    </div>
}

export default ReportItemProject
