import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dateToUtcString from '../../utils/dateToUtcString';
import CommentVotes from '../Articles/Buttons/Votes/CommentVotes';
import { getArticles } from '../../utils/api';
import EditAndDelete from '../EditAndDelete/EditAndDelete';
import colors from '../../utils/variantColours';

function SingleComment({
  comment, variantColour, lastComment, userComment,
}) {
  const [articleTitle, setArticleTitle] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (userComment) {
      getArticles({ id: comment.article_id }, 0).then(({ articles }) => {
        setArticleTitle(articles[0].title);
      })
        .catch((err) => {
          console.log('ERROR: ', err);
        });
    }
  }, [comment.article_id, userComment]);
  return (
    <div style={{
      borderBottom: lastComment === true ? 'none' : '2px solid #EBEFF4',
      paddingBottom: '20px',
      paddingTop: '20px',
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ color: variantColour }}>
          {dateToUtcString(comment.created_at)}
        </p>
        {userComment
          ? (
            <button
              type="button"
              style={{
                color: variantColour,
                textDecoration: 'underline',
                textAlign: 'right',
                cursor: 'pointer',
                width: '40%',
                border: 'none',
                fontSize: 'inherit',
                fontFamily: 'inherit',
                backgroundColor: 'inherit',
              }}
              onClick={() => navigate(`/articles/${comment.article_id}`, { state: { variantColour } })}
            >
              {articleTitle}
            </button>
          )
          : (
            <a
              style={{
                color: variantColour,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              href={`/articles?author=${comment.author}`}
            >
              {comment.author}
            </a>
          )}
      </div>
      <p>{comment.body}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CommentVotes commentId={comment.id} votes={comment.votes} variantColour={variantColour} />
        {
        // eslint-disable-next-line consistent-return
        (() => {
          if (userComment) {
            return <EditAndDelete type="comment" subject={comment} />;
          }
        })()
      }
      </div>
    </div>
  );
}

export default SingleComment;

SingleComment.propTypes = {
  comment: PropTypes.exact({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    article_id: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  variantColour: PropTypes.oneOf(colors).isRequired,
  lastComment: PropTypes.bool.isRequired,
  userComment: PropTypes.bool.isRequired,
};
