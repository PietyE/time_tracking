import React from "react";

function CreateComment({profile}){
    let { imageUrl} = profile
    return <div className='container comment__create'>
        <div className="row">
            <div className="comment__create-avatar">
                <img src={imageUrl} alt=""/>
            </div>
            <textarea className="comment__create-textarea"/>
        </div>
    </div>
}

export default CreateComment;