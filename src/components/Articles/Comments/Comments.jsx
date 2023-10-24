import SingleComment from "./SingleComment";

function Comments({ comments, variantColour }) {
    return (
        <div
        style={{
            paddingTop: '5px',
            marginBottom: '30px',
        }}
        className="single-article-content-container">
            {comments.length === 0
            ?
            <div style={{ paddingBottom: '20px' }}>
                <p>Be the first one to comment</p>
            </div>
            :
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                    <button
                        type='button'
                        className="action-btn white"
                        // TODO onHover change color to yellow same as other action btns
                        style={{ backgroundColor: variantColour }}
                        onClick={() => 'TODO open post comment form'}
                    >
                        <strong>
                            Post a comment
                        </strong>
                    </button>
                </div>
                {comments.map((comment, index) => {
                    return <SingleComment comment={comment} variantColour={variantColour} lastComment={index + 1 === comments.length}/>
                })}
            </div>
        }
        </div>
    )
}

export default Comments;