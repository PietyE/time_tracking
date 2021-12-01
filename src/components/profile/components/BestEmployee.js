import React from "react";

import emojiSmile from '../../../images/emoji-smile.png';



function BestEmployee(){
    return<div className="best">
        <div className="row justify-content-center">
            <img src={emojiSmile} alt="emoji smile"/>
            <h5 className="best-title">Best employee of September</h5>
        </div>
        
        <p>Congratulations to Dmytro! (or some custome text)</p>
    </div>
}

export default BestEmployee;