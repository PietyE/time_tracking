import React from 'react';
import Icon from '../../../images/email-icon.svg'
// import {FaVoicemail} from "react-icons/fa";


function InfoItem() {
    return <div className="info__item">
        <div className="row">
            <div className="info__item-icon-container">
                <img src={Icon} alt=""/>
                {/*<FaVoicemail className="icon" />*/}
            </div>
            <div className="info__item-wrap">
                <p className="info__item-label">Email</p>
                <p className="info__item-value">gleb.kondratiev@vilmate.com</p>
            </div>
        </div>
    </div>

}

export default InfoItem