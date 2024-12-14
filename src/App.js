import logo from './logo.svg';
import './App.css';
import { Comment } from './component/Comment.jsx';
import { useState } from "react"
import { AddReplyContext } from './component/store/AddReplyContext.jsx';


function App() {

  const [comments ,setComments]=useState([{
    id: 1,
    display: "comment1",
    replies: [
      {
        id: 2,
        display: "Reply comment1",
        replies: []
      },
      {
        id: 3,
        display: "Reply comment2",
        replies: []
      }
    ]
  }
  ])
  function addReply(commentId,replyText){
    let newCommentReply =[...comments]
    insertComment(newCommentReply,commentId,replyText)
    setComments(newCommentReply)
  }

  function insertComment(comments,parentId,replyText){
   const reply= newComment(replyText)
     for (let i=0;i<comments.length;i++){
      let comment = comments[i];
      if (comment.id===parentId){
        comment.replies.unshift(reply)
      }

     }
     for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      insertComment(comment.replies, parentId, replyText);
    }

  }
  function newComment (text){
    return{
    id:new Date().getTime(),
    display:text,
    replies:[]
    }
}
 
const ctxValue={
  addReply:addReply
}
  return (
   <div className='background'>
   <AddReplyContext.Provider value={ctxValue}>
   <Comment
    comments={comments}
    setComments={setComments}
    newComment={newComment}
    />
   </AddReplyContext.Provider>
   </div>
   
  );
}

export default App;
