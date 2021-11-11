import React, { useState, useContext, useMemo } from 'react'
import closeButton from '../../../images/projectReportIcons/closeButton.svg'
import UserComment from './UserComment';
import {ProjectReportContext} from 'context/projectReport-context'

function Comments (props) {
  const { comments, commentId, avatarUrl } = props;
  const contextType = useContext(ProjectReportContext);

  const onClick = (e) => {
    e.stopPropagation()
    contextType.openComments()
  }
  
  return (
    <div className="comments_container">
      <div className="comments_header">
        <span className="comments_header_text">Leave a comment</span>
        <img src={closeButton} className="comment_close_button" onClick={onClick}/>
      </div>
      <div>
       {comments && comments.map(comment => (
         <UserComment text={comment} key={commentId} url={avatarUrl}/>
       ))
       }
      </div>
      <div className="comments_footer">
        <div className="footer_close_button" onClick={onClick}>Done</div>
      </div>
    </div>
  )
}

export default Comments;