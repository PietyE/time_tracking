import React from "react";
import CreateComment from "./CreateComment";
import CommentItem from "./CommentItem";



function Comments({profile}){
    return<div className='personal__info comment'>
       <h4 className='profile__container-title'>Comments</h4>
        <CreateComment profile={profile}/>
        <CommentItem/>
    </div>
}

export default Comments;