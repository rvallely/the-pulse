import dateToUtcString from "../../utils/dateToUtcString";
import { useNavigate } from "react-router-dom";
import CommentVotes from "../Articles/Buttons/Votes/CommentVotes";
import { useEffect, useState } from "react";
import { getArticles } from "../../utils/api";
import EditAndDelete from "../EditAndDelete/EditAndDelete";

function SingleComment({ comment, variantColour, lastComment, userComment }) {
    const [articleTitle, setArticleTitle] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (userComment) {
            getArticles({id: comment.article_id}, 0).then(({articles}) => {
 
                setArticleTitle(articles[0].title);
            })
            .catch((err) => {
                console.log('ERROR: ', err);
            })
        }
    }, [comment.article_id, userComment]);
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
                    {userComment
                    ?
                    <p
                        style={{
                            color: variantColour,
                            textDecoration: 'underline',
                            textAlign: 'center',
                            cursor: 'pointer',
                            width: '40%'
                        }}
                        onClick={() => navigate(`/articles/${comment.article_id}`, { state: { variantColour } })}
                    >
                        {articleTitle}
                    </p>
                    :
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
                    }
                </div>
            <p>{comment.body}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <CommentVotes type={'comment'} commentId={ comment.id } votes={comment.votes } variantColour={variantColour}/>
                {userComment
                ?
                < EditAndDelete />
                :
                <></>
                }
            </div>
        </div>
    )
}

export default SingleComment;