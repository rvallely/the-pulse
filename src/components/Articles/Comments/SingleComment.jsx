import dateToUtcString from "../../../utils/dateToUtcString";
import { useNavigate } from "react-router-dom";
import CommentVotes from "../Buttons/Votes/CommentVotes";

function SingleComment({ comment, variantColour, lastComment }) {
    const navigate = useNavigate();
    return (
        <div style={{
            borderBottom: lastComment === true? 'none': '2px solid #EBEFF4',
            paddingBottom: '20px',
            paddingTop: '20px',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <p style={{ color: variantColour}}>
                    {dateToUtcString(comment.created_at)}
                </p>
                <p
                    style={{
                        color: variantColour,
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/articles?author=${comment.author}`)}
                >
                    {comment.author}
                </p>
                </div>
            <p>{comment.body}</p>
            <CommentVotes type={'comment'} commentId={ comment.id } votes={comment.votes } variantColour={variantColour}/>
        </div>
    )
}

export default SingleComment;