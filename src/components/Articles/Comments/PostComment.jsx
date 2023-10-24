import { useContext, useState } from "react";
import { postComment } from "../../../utils/api";
import { UserContext } from "../../../contexts/User";

function PostComment({ articleId, variantColour, setCommentPosted, setPostCommentOpen }) {
    const [body, setBody] = useState('');
    const { loggedInUser: { username } } = useContext(UserContext);

    const postUserComment = () => {
        postComment(articleId, { username, body }).then(() => {
            setCommentPosted(true);
            setPostCommentOpen(false)
        })
    }

    return (
        <div style={{
            paddingBottom: '20px',
            paddingTop: '20px',
        }}>
            <form>
                <textarea
                    style={{
                        resize: 'none',
                        padding: '10px',
                        boxSizing: 'border-box',
                        border: '2px solid #EBEFF4',
                        borderRadius: '5px',
                        width: '100%',
                        outline: 'none',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                        minHeight: '150px'
                    }}
                    onChange={(e) => setBody(e.target.value)}
                >
                </textarea>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        type='button'
                        className="action-btn white"
                        // TODO onHover change color to yellow same as other action btns
                        style={{ backgroundColor: variantColour }}
                        onClick={postUserComment}
                    >
                        <strong>
                            Post
                        </strong>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PostComment;