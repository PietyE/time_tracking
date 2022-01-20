import React, {useCallback, useEffect, useState} from 'react'
import "./style.scss"
import DownloadIc from "../../../images/download_ic.svg"
import TrashGrayIc from "../../../images/trash_cray_ic.svg"
import { downloadProjectReport} from "../../../actions/projects-management";
import {useDispatch} from "react-redux";




function TeamM({e, del,d, hovers, setWorkType}) {
    let [fulTime, setFullTime] = useState(e.is_full_time);
    const dispatch = useDispatch()

    const _downloadProjectReport = useCallback(
        (data) => {
            dispatch(downloadProjectReport(data))
        },
        [dispatch],
    )

    useEffect(()=>{
        setWorkType(e.user_id || e.id , fulTime)
    },[fulTime]);


    return <div className='container team-m'>
        <div className="row ">
            <div className={'avatar-cont'}>
                <img src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png" alt="" className={'team-m-avatar'}/>
                <div>
                    <h4 className="team-m-name">
                        {e.name}
                    </h4>
                    {d&&
                        <p className='team-m-email'>{e.email}</p>
                    }
                </div>
            </div>
            <form className={'team-m__type-work ' +(hovers ?'flex-column':'')}>
                <div className="label-def">
                    <span>
                        Part-time
                    </span>
                </div>
                <div className="team-m-input-cont">
                    <label htmlFor={e.id ||e.user_id}>
                        <input name="w-type" type="radio"
                               checked={!fulTime ? 'checked':'' }
                               id={e.id ||e.user_id}
                               onChange={()=>{setFullTime(false)}}
                        />
                        <span className="checkmark"></span>
                        Part-time
                    </label>
                </div>
               <div className="team-m-input-cont">
                   <label htmlFor={e.id+1 || e.user_id+1}>
                       <input name="w-type" type="radio"
                              checked={fulTime ? 'checked':'' }
                              onChange={()=>{setFullTime(true)}}
                              id={e.id+1 || e.user_id+1}/>
                       <span className="checkmark"></span>
                       Full-time
                   </label>
               </div>
            </form>
            {hovers &&
                <div className='estimate-hours'>
                    {hovers}
                </div>
            }
            <div className="trash-cont" >
                <img className={'gray-trash'} onClick={()=>{del(e.id || e.user_id)}} src={TrashGrayIc} alt=""/>
                <img className={'download'} onClick={()=>{_downloadProjectReport(e.projectReportId)}}  src={DownloadIc} alt=""/>
            </div>
        </div>
    </div>
}

export default TeamM