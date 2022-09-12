import { useEffect, useState, useContext} from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from "../../store/notification-context"

function Comments(props) {
  const notificaionCtx = useContext(NotificationContext);
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments,setComments] = useState();
  const [isFetchingComments,setIsFetchingComments] = useState(false);
  useEffect(() => {
    if(showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then(res => res.json())
        .then(data => {
          setComments(data.comments);
          setIsFetchingComments(false);
        })  
    }

  },[showComments]);
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    console.log("commentdata is",commentData);
    notificaionCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database.",
      status: "pending"
    });
    fetch(`/api/comments/${eventId}`,{
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return res.json().then((data) => {
        throw new Error(data.message || 'something went wrong !!!');
      });
    })
    .then(data => {
      console.log(data);
      notificaionCtx.showNotification({
        title: "Success...",
        message: "Successfully Commented",
        status: "success"
      });
      fetch(`/api/comments/${eventId}`)
      .then(res => res.json())
      .then(data => {
        setComments(data.comments);
      })  
    })
    .catch(error => {
      notificaionCtx.showNotification({
        title: "Error...",
        message: error.message || " something went wrong!!!",
        status: "error"
      })
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments}/>}
      {showComments && isFetchingComments && <p>Loading!!!...</p>}
    </section>
  );
}

export default Comments;
