import React from "react";

function AvatarInfo({name, imageUrl}){
    return<div className='profile__container'>
       <img src={imageUrl} atl ="avatar" className="profile__container-image"/>
        <h4  className="profile__container-title">{name}</h4>
        <p  className="profile__container-position">UX & UI Designer</p>
        <button className='btn'>Research</button>
        <button className='btn'>Analytics</button>
    </div>
}

export default AvatarInfo