import React from 'react';
import PropTypes from 'prop-types';
import Votes from './Votes';
import colors from '../../../../utils/variantColours';

function ArticleVotes({
  type, articleId, votes, variantColour,
}) {
  return <Votes type={type} articleId={articleId} votes={votes} variantColour={variantColour} />;
}

export default ArticleVotes;

ArticleVotes.propTypes = {
  type: PropTypes.oneOf(['disabled', 'article']).isRequired,
  articleId: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  variantColour: PropTypes.oneOf(colors).isRequired,
};
