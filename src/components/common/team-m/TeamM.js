import React from 'react'
import "./style.scss"
import TrashImg from "../../../images/ic_trash .svg"



function TeamM() {
    return <div className='container team-m'>
        <div className="row ">
            <div className={'avatar-cont'}>
                <img src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png" alt="" className={'team-m-avatar'}/>
                <h4 className="team-m-name">
                    Hanna Polishchuk
                </h4>
            </div>
            <form className="team-m__type-work">
                <div className="team-m-input-cont">
                    <label htmlFor="partTime">
                        <input name="w-type" type="radio" checked="checked" id="partTime"/>
                        <span className="checkmark"></span>
                        Part-time
                    </label>
                </div>
               <div className="team-m-input-cont">
                   <label htmlFor="fullTime">
                       <input name="w-type" type="radio"  id="fullTime"/>
                       <span className="checkmark"></span>
                       Full-time
                   </label>
               </div>
            </form>
            <div className="trash-cont">
                <img src={TrashImg} alt=""/>
            </div>
        </div>
    </div>
}

export default TeamM