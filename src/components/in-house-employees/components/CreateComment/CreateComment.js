import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './style.scss'
import UserAvatar from 'components/ui/profile-avatar'
import { setEditedComment } from 'actions/users'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getIsFetchingProjectsReport } from 'selectors/developer-projects'

function CreateComment (props) {
    const { selectedDate, commentsId, id } = props;
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const fetchingStatus = useShallowEqualSelector(getIsFetchingProjectsReport)

    useEffect(() => {
      if (isFetching) {
        setIsFetching(fetchingStatus)
      }
    }, [fetchingStatus])

    const handleSaveEditedComment = () => {
      const data = {
        user: id,
        date: new Date(selectedDate.year, selectedDate.month + 1)
          .toISOString()
          .slice(0, 10),
        text: text,
        commentId: commentsId,
      }
      dispatch(setEditedComment(data))
      setIsFetching(true)
    }

    const createComment = (e) => {
      if(e.target.value) {
        setText(e.target.value)
      } else {
        console.log("Invalid character entered")
      }
    }
    
    return (
      <div className="user_comment_create">
        <div className="user_avatar">
          <UserAvatar />
        </div>
        <div className="comment_container">
          <textarea type="text" className="text_input" onChange={createComment} value={text}></textarea>
          <div className="submit_button" onClick={handleSaveEditedComment}>Post</div>
        </div>
      </div>
    )
  }
  
  export default CreateComment;