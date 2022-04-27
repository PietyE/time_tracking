import React, {memo} from 'react';
import AvatarInfo from './components/AvatarInfo';
import PersonalInfo from './components/PersonalInfo';
import WorksOn from './components/WorksOn';
import {
 getProfile
} from 'selectors/user'
import {useSelector } from 'react-redux'
import './style.scss';
import Comments from './components/Comments';
import BestEmployee from './components/BestEmployee';
import LikesInfo from './components/LikesInfo';
import ContactDetails from './components/ContactDetails';

function Profile(){
   const profile = useSelector(getProfile);

   let  {
       name,
    //    email,
       imageUrl
    }=profile;

    return<div className='container profile'>
        <h1 className="profile-title">My profile</h1>
        <div className="row">
            <a href="/#" className="more back-to"><span className='arrow'></span>Back to people list</a>
        </div>
        <div className="row">
            <div className="col-lg-4">
                <AvatarInfo
                    name={name}
                    imageUrl={imageUrl}
                />
                <LikesInfo/>
                <WorksOn/>
                <ContactDetails/>
            </div>
            <div className="col-lg-8">
                <BestEmployee/>
                <PersonalInfo/>
                <Comments profile={profile}/>
            </div>
        </div>
    </div>
}

export default memo(Profile);