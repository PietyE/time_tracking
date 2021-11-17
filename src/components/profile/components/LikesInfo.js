import React from "react";

import Like from "../../../images/like.png";
import DisLike from "../../../images/dislike.png"
import Info from "../../../images/info-circle1.png"

function LikesInfo(){
    return <div className="container likes__block">
        <div className="row justify-content-center">
            <h5 className="likes__block-title">BEST EMPLOYEE OF OCTOBER <img src={Info} alt="Info"/></h5>
        </div>
        <div className="row justify-content-center">
            <div className="likes__block-cont">
                <div className="licks">
                    <div className="row">
                        <div className="icon-block">
                            <img src={Like} alt=""/>
                        </div>
                        <div className="count-block">
                            11
                        </div>
                    </div>
                </div>
                <div className="dislicks">
                    <div className="row">
                        <div className="icon-block">
                            <img src={DisLike} alt=""/>
                        </div>
                        <div className="count-block">
                            02
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default LikesInfo;