import React from 'react'
import "./style.scss"
import TrashImg from "../../../images/ic_trash .svg"



function TeamM({e, del,d, hovers}) {
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
                <div className="team-m-input-cont">
                    <label htmlFor={e.id}>
                        <input name="w-type" type="radio"  defaultChecked="checked" id={e.id}/>
                        <span className="checkmark"></span>
                        Part-time
                    </label>
                </div>
               <div className="team-m-input-cont">
                   <label htmlFor={e.id+1}>
                       <input name="w-type" type="radio"  id={e.id+1}/>
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
            <div className="trash-cont" onClick={()=>{del(e.id)}}>
                <img src={TrashImg} alt=""/>
            </div>
        </div>
    </div>
}

export default TeamM