import { useState,useEffect,useRef } from "react"


export default function Comment(){


    const[inputComment,setInputComment]=useState('')
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

    function newComment(text) {
      return {
        id: new Date().getTime(),
        display: text,
        replies: []
      };
    }

    function addReply(commentId,replyText){
      let newCommentReply =[...comments]
      insertComment(newCommentReply,commentId,replyText)
      setComments(newCommentReply)


    }
    function insertComment(comments,parentId,text){
      for (let i=0;i<comments.length;i++){
        let comment =comments[i];
        if(comment.id===parentId){
          comment.replies.unshift(newComment(text))
        }
      }
      for (let i = 0; i < comments.length; i++) {
        let comment = comments[i];
        insertComment(comment.replies, parentId, text);
      }

    }

    const handelComment = function(){
        setComments([newComment(inputComment),...comments])
        setInputComment('')
       
        
    }

    return(
        <div>
             <textarea
                type='text'
                rows="4"
                cols="50"
                value={inputComment}
                placeholder="comment"
                onChange={(event)=>setInputComment(event.target.value)}
             />
             <button onClick={handelComment}
             >Submit</button>

                <ul>
                  {comments.map((comment)=>(
                    <CommentList 
                    key={comment.id} 
                    comment={comment} 
                    addReply={addReply}>
                    </CommentList>
                  ))}
                </ul>
        
        </div>
       
    )
}

const CommentList = ({ comment,addReply }) => {
    const [inputReply, setInputReply] = useState('');
    const [showReplyBox, setShowReplyBox] = useState(false);
  
console.log('Real Comment-Id:',comment.id)
    const handelReplies=()=>{
        addReply(comment.id,inputReply)
        setShowReplyBox(false);
        setInputReply("");
    }
  
    return (
        <li key={comment.id}>
        {comment.display}
        {!showReplyBox &&(
          <div>
            <button
            type='button'
            onClick={()=>{
            setShowReplyBox(true)
            }}
            >reply</button>
          </div>
        )}
        {showReplyBox && (
            <>
                <textarea
                type="text"
                placeholder="Type reply....."
                value={inputReply}
                onChange={(e)=>setInputReply(e.target.value)}

                />
                <button onClick={handelReplies}>Save</button>

                <button onClick={()=>{
                  setShowReplyBox(false);
                  setInputReply('');
                }}>Cancel</button>
            </>
        )}
         {comment.replies.length>0 && (
          <ul>
            {comment.replies.map((reply)=>(
              <CommentList key={reply.id} comment={reply} addReply={addReply} />
            ))}
          </ul>
          )}
        </li>
    );
  };
  