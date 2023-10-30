import React from 'react';
import PropTypes from 'prop-types';
import Votes from './Votes';
import colors from '../../../../utils/variantColours';

function CommentVotes({ commentId, votes, variantColour }) {
  return <Votes type="comment" commentId={commentId} votes={votes} variantColour={variantColour} />;
}

export default CommentVotes;

CommentVotes.propTypes = {
  commentId: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired,
  variantColour: PropTypes.oneOf(colors).isRequired,
};
