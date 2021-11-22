import React from "react";

function Card({user}) {
    return(
        <div className="col-lg-3">
            <div className="card card__block">
                <div className="card__block-avatar">
                    <img src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png" alt=""/>
                </div>
                <h4 className="card__block-name">{user.name} </h4>
                <p className="card__block-position">Project Manager</p>
                <a href="#" className="btn profile-btn">View profile</a>
            </div>
        </div>
    )
}

export default Card;