import React, {memo} from "react";
import AvatarInfo from "./components/AvatarInfo";
import PersonalInfo from "./components/PersonalInfo";
import WorksOn from "./components/WorksOn";
import {
 getProfile
} from 'selectors/user'
import {useSelector } from 'react-redux'
import "./style.scss";

function Profile(){
   const profile = useSelector(getProfile);

   console.log('profile', profile);

   let  {
       name,
       email,
       imageUrl
    }=profile;

    return<div className='container profile'>
        <h1 className="profile-title">My profile</h1>
        <div className="row">
            <div className="col-lg-4">
                <AvatarInfo
                    name={name}
                    imageUrl={imageUrl}
                />
                <WorksOn/>
            </div>
            <div className="col-lg-8">
                <PersonalInfo/>
            </div>
        </div>
    </div>
}

export default memo(Profile);