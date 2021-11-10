import React from "react";
import InfoItem from "./InfoItem";

function PersonalInfo(){
    return<div className="profile__container text-left personal__info">
        <h4 className="profile__container-title">Personal information</h4>
        <div className="container">
            <div className="row">
                <div className="col-lg-7">
                   <InfoItem/>
                   <InfoItem/>
                   <InfoItem/>
                </div>
                <div className="col-lg-5">
                    <InfoItem/>
                    <InfoItem/>
                    <InfoItem/>
                </div>

            </div>
            <hr/>
            <div className="personal__info-about">
                <div className="row">
                    <h4 className="profile__container-title small">About</h4>
                </div>
                <div className="row">
                    <p>Глеб не любит просто “перемещать пиксели по экрану”, ему интересно делать делать продукты действительно лучше. Так, благодаря UX аналитике Глеб привлек 1 миллион новых пользователей в SaaS продукт. Читайте ответы на традиционные вопросы ниже :)</p>
                </div>
                <div className="row">
                    <a href="" className="more">Read More</a>
                </div>
            </div>

        </div>
    </div>
}

export default PersonalInfo