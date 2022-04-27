import React from "react";

function CreateComment({profile}){
    let { imageUrl} = profile
    return <div className='container comment__create'>
        <div className="row">
            <div className="comment__create-avatar">
                <img src={imageUrl} alt=""/>
            </div>
            <textarea placeholder='Add a comment about Larov Dmytro' className="comment__create-textarea"/>
        </div>
    </div>
}

export default CreateComment;