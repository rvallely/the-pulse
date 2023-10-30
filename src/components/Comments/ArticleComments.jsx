import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/User';
import PostComment from './PostComment';
import SingleComment from './SingleComment';
import SortIcon from '../Sort/SortIcon';
import colors from '../../utils/variantColours';

function ArticleComments({
  comments, variantColour, articleId, setCommentPosted,
}) {
  const [postCommentOpen, setPostCommentOpen] = useState(false);
  const { loggedInUser: { username } } = useContext(UserContext);

  return (
    <div
      id="comments-container"
      style={{
        paddingTop: '5px',
        marginBottom: '30px',
      }}
      className="single-article-content-container"
    >
      {
            !postCommentOpen
              ? (
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}
                >
                  <button
                    type="button"
                    className="action-btn white"
                    // TODO onHover change color to yellow same as other action btns
                    style={{ backgroundColor: variantColour }}
                    onClick={() => (username === 'Log in' ? alert('Please log in to post a comment.') : setPostCommentOpen(true))}
                  >
                    <strong>
                      Post a comment
                    </strong>
                  </button>
                  {
                    // eslint-disable-next-line consistent-return
                    (() => {
                      if (comments.length >= 2) {
                        return <SortIcon type="comments" variantColour={variantColour} />;
                      }
                    })()
                  }
                </div>
              )
              : (
                <PostComment
                  articleId={articleId}
                  variantColour={variantColour}
                  setCommentPosted={setCommentPosted}
                  setPostCommentOpen={setPostCommentOpen}
                />
              )
}
      {
            comments.length === 0
              ? <p style={{ paddingBottom: '10px' }}>Be the first one to comment!</p>
              : comments.map((comment, index) => (
                <SingleComment
                  key={`single-comment-comment-id-${comment.id}`}
                  comment={comment}
                  variantColour={variantColour}
                  lastComment={index + 1 === comments.length}
                  userComment={false}
                />
              ))

        }
    </div>
  );
}

export default ArticleComments;

ArticleComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    article_id: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })),
  variantColour: PropTypes.oneOf(colors).isRequired,
  articleId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setCommentPosted: PropTypes.func.isRequired,
};

ArticleComments.defaultProps = {
  comments: [],
};
