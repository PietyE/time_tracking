import React, { } from 'react'
import './style.scss'

function UserComment (props) {
    const { text, url } = props;
    
    return (
      <div className="user_comment">
        <div className="user_avatar">
          <img src={url} className="img_avatar" />
        </div>
        <div className="comment_container">
          <span className="comment_text_container">
            <span className="comment_text_author">Gleb Kondratiev</span>
            <span className="comment_text">{text}</span>
          </span>
          <span className="comment_date">06 Aug 2021</span>
        </div>
      </div>
    )
  }
  
  export default UserComment;