import { useContext, useState } from "react"
import {AddReplyContext} from "./store/AddReplyContext.jsx"

export function ReplyCommentList({comment}){
const [inputReply,setInputReply]=useState('')
const [showReplyBox, setShowReplyBox] = useState(false);
const {addReply}= useContext(AddReplyContext)

function handelReplies(){
    addReply(comment.id,inputReply);
    setShowReplyBox(false)
    setInputReply("");
}
    return (
        <li key={comment.id}>
            {comment.display}
            {!showReplyBox &&(
                    <div>
                        <button
                        onClick={()=>{setShowReplyBox(true)}}
                        >reply</button>
                    </div>
                )}
            {showReplyBox &&(
                <>
                <textarea 
                value={inputReply}
                placeholder="reply..."
                onChange={event=>setInputReply(event.target.value)}
                />
                <button onClick={handelReplies}>Save</button>
                <button
                 onClick={()=>{setShowReplyBox(false)}}
                >Cancel</button>
                </>
            )}
            {comment.replies.length>0 && (
                <ul>
                    {comment.replies.map(reply =>(
                            <ReplyCommentList key={reply.id}
                            comment={reply}
                            addReply={addReply}
                            />
                        ))}
                </ul>
            )}
        </li>
    )

}