import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../../../contexts/User';
import { patchArticle, patchComment } from '../../../../utils/api';
import thumbsUp from '../../../../assets/icons/votes.png';
import colors from '../../../../utils/variantColours';

function Votes({
  type, articleId, commentId, votes, variantColour,
}) {
  const [userVote, setUserVote] = useState(0);
  const { loggedInUser: { username } } = useContext(UserContext);

  const addVote = () => {
    /**
      * Only allow user to vote once per page load of article.
      */
    if (type !== 'disabled') {
      if (userVote === 0) {
        setUserVote(1);
        if (type === 'article') {
          patchArticle({ id: articleId, body: { votes: votes + 1 } }).catch((err) => {
            // TODO: make all alerts custom messages on relevant page
            alert('Whoops, something went wrong, sorry about that.');
            // TODO: set error and show
            console.log('ERROR: ', err);
            setUserVote(0);
          });
        }
        if (type === 'comment') {
          patchComment({ id: commentId, body: { votes: votes + 1 } }).catch((err) => {
            alert('Whoops, something went wrong, sorry about that.');
            console.log('ERROR: ', err);
            // TODO: set error and show
            setUserVote(0);
          });
        }
        document.getElementById(type === 'article' ? `${type}-vote-button` : `${commentId}-${type}-vote-button`).style.cursor = 'initial';
        document.getElementById(type === 'article' ? `${type}-vote-button` : `${commentId}-${type}-vote-button`).disabled = true;
      }
    }
  };

  return (
    <button
      id={type === 'article' ? `${type}-vote-button` : `${commentId}-${type}-vote-button`}
      className="action-btn votes-action-btn white"
      type="button"
      style={{
        backgroundColor: variantColour,
        height: '46px',
        width: '70px',
        display: 'flex',
        marginTop: '0',
        padding: '0px',
        alignItems: 'center',
        cursor: username === 'Log in' || type === 'disabled' ? 'initial' : 'pointer',
      }}
      disabled={type === 'disabled'}
      onClick={
                username === 'Log in'
                  ? () => alert('Please log in to vote.')
                  : () => addVote()
            }
    >
      <p style={{ fontSize: '1.25rem', marginLeft: '6px', marginRight: '6px' }}>
        {Number(votes) + userVote}
      </p>
      <img style={{ height: '35px' }} src={thumbsUp} alt="votes thumbs up icon" />
    </button>
  );
}

export default Votes;

Votes.propTypes = {
  type: PropTypes.oneOf(['disabled', 'article', 'comment']).isRequired,
  articleId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  commentId: PropTypes.number,
  votes: PropTypes.number.isRequired,
  variantColour: PropTypes.oneOf(colors).isRequired,
};

Votes.defaultProps = {
  articleId: undefined,
  commentId: undefined,
};
