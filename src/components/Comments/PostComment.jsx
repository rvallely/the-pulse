import { useContext, useState } from "react";
import { postComment } from "../../utils/api";
import { UserContext } from "../../contexts/User";

function PostComment({ articleId, variantColour, setCommentPosted, setPostCommentOpen }) {
    const [body, setBody] = useState('');
    const { loggedInUser: { username } } = useContext(UserContext);

    const postUserComment = (e) => {
        e.preventDefault();
        postComment(articleId, { username, body }).then(() => {
            setCommentPosted(true);
            setPostCommentOpen(false)
        });
    }

    return (
        <div style={{
            paddingBottom: '20px',
            paddingTop: '20px',
        }}>
            <form onSubmit={postUserComment}>
                <textarea
                    name='post-comment-body'
                    required
                    className="post-article-comment-form-element"
                    style={{
                        border: '2px solid #EBEFF4',
                        minHeight: '150px'
                    }}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                >
                </textarea>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        type='submit'
                        className="action-btn white"
                        // TODO onHover change color to yellow same as other action btns
                        style={{ backgroundColor: variantColour }}
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