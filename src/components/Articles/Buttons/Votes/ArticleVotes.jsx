import Votes from "./Votes";

function ArticleVotes({ type, articleId, votes, variantColour }) {
    return <Votes type={type} articleId={ articleId } votes={ votes } variantColour={ variantColour }/>
}

export default ArticleVotes;