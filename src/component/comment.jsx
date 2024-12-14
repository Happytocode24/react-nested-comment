import { useState } from "react"
import { ReplyCommentList } from "./ReplyCommentList"



export function Comment({comments,setComments,newComment}){
    const [inputComment,setInputComment]=useState('')
  
    function handelComment(){
        setComments([
            ...comments,
            newComment(inputComment)
        ])
        setInputComment('')
    }
    return(
        <div>
            <textarea
            value={inputComment}
            placeholder="Comment...."
            onChange={(e)=>setInputComment(e.target.value)}
            ></textarea>
            <button onClick={handelComment}>Submit</button>
            <ul>
                {
                    comments.map(comment =>(
                        <ReplyCommentList
                        key={comment.id}
                        comment={comment}
                        />
                    ))
                }
               
            </ul>
        </div>
    )
}