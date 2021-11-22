import React, {useState} from "react";
import InfoItem from "./InfoItem";
import emailI from '../../../images/email-icon.svg'


function PersonalInfo(){
    let [longDescription, setLongDescription] = useState(false)
    return<div className="profile__container text-left personal__info">
        <h4 className="profile__container-title">Personal information</h4>
        <div className="container">
            <div className="row">
                <div className="col-lg-7">
                   <InfoItem />
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
                    <h5 className="profile__container-title small">About</h5>
                </div>
                <div className="row ">
                   <p className={'description' +(longDescription?'open':'')}>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut mi ultrices odio aliquet sollicitudin. Donec pulvinar vestibulum odio, ut congue neque sollicitudin ac. Etiam sed augue non dolor iaculis mollis. Nunc sollicitudin ante nibh, a pretium est varius et. Nullam at rutrum justo, in tempor magna. Aliquam eget tellus et dolor suscipit luctus nec vitae orci. Fusce luctus, erat ac laoreet suscipit, enim lacus rhoncus ligula, sagittis placerat lectus est et orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam elementum vehicula elit, ac consequat libero dictum quis. Ut suscipit neque urna, at fermentum nibh mollis eget. Praesent et lacus nec enim tincidunt dignissim. Nam lobortis, quam a dapibus lacinia, purus odio volutpat augue, in pellentesque purus dui nec eros.

                              Duis sit amet enim et mauris venenatis tempus id ut purus. Nullam pellentesque ac turpis at consectetur. Donec a purus ut velit luctus sagittis. Aliquam tempus semper augue at tempor. Curabitur dapibus lacinia augue, eu scelerisque arcu hendrerit eleifend. Nulla ac cursus est. Sed ultricies tortor ac nunc porta, nec vulputate lectus maximus. Nam pharetra dignissim elit vitae placerat. Praesent dapibus urna lectus, in posuere massa volutpat at. Aliquam erat volutpat. Donec hendrerit lectus a lacus suscipit auctor. Integer malesuada elit sit amet lacus auctor, nec ullamcorper ipsum suscipit.

                              Quisque scelerisque sed eros vitae faucibus. Suspendisse euismod maximus aliquet. In hac habitasse platea dictumst. Sed facilisis lacus tempor metus malesuada rhoncus. Proin eu leo ligula. Pellentesque ipsum tortor, tempor ut mollis at, facilisis ac orci. Vivamus consequat felis ac pellentesque accumsan. Aenean commodo lacinia fermentum. Sed euismod ante odio. Curabitur porta mauris lectus, vel rutrum enim suscipit eget. Duis sed vulputate tortor.

                              Maecenas quam augue, tempor vel diam eu, congue euismod velit. Ut ac faucibus libero. Proin sed velit molestie, dapibus neque sit amet, varius sem. Proin sed massa sit amet mi tempus hendrerit. Aliquam tincidunt euismod dui, nec consectetur lacus pulvinar vel. Phasellus dignissim, lorem non pellentesque vehicula, odio erat aliquet magna, in pulvinar lorem sapien aliquet dui. Praesent cursus massa in sollicitudin tincidunt. Mauris sed mauris justo.

                              Duis egestas ipsum a eros ullamcorper, ac venenatis leo iaculis. Etiam volutpat condimentum odio, eu commodo mauris dictum eu. Vivamus viverra dignissim massa vitae placerat. Curabitur tempor semper libero et convallis. Sed nec bibendum lorem. Integer sagittis turpis ac lacus volutpat dictum. Pellentesque consequat at lorem eget porttitor. Praesent nisi elit, dignissim vitae nunc vitae, viverra dapibus sapien.
                        </p>


                </div>
                <div className="row">
                    <a onClick={()=>{setLongDescription(!longDescription)}} className="more">Read More <span className={'arrow '+ (longDescription ? 'open':'')}></span></a>
                </div>
            </div>

        </div>
    </div>
}

export default PersonalInfo