import { UserContext } from "../../../contexts/User";
import PostComment from "./PostComment";
import SingleComment from "./SingleComment";
import { useContext, useState } from "react";

function Comments({ comments, variantColour, articleId, setCommentPosted }) {
    const [postCommentOpen, setPostCommentOpen] = useState(false);
    const { loggedInUser: { username } } = useContext(UserContext);

    return (
        <div
        style={{
            paddingTop: '5px',
            marginBottom: '30px',
        }}
        className="single-article-content-container">
            {
            !postCommentOpen
            ?
            <div
            style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}
            >
                <button
                    type='button'
                    className="action-btn white"
                    // TODO onHover change color to yellow same as other action btns
                    style={{ backgroundColor: variantColour }}
                    onClick={() => username === 'Log in' ? alert('Please log in to post a comment.'): setPostCommentOpen(true)}
                >
                    <strong>
                        Post a comment
                    </strong>
                </button>
            </div>
            :
            <PostComment
                articleId={articleId}
                variantColour={variantColour}
                setCommentPosted={setCommentPosted}
                setPostCommentOpen={setPostCommentOpen}
            />
            }
            {
            comments.length === 0
            ?
            <p style={{ paddingBottom: '10px' }}>Be the first one to comment!</p>
            :
            comments.map((comment, index) => {
                return (
                    <SingleComment
                        comment={comment}
                        variantColour={variantColour}
                        lastComment={index + 1 === comments.length}
                    />
                )
            })
   
        }
        </div>
    )
}

export default Comments;