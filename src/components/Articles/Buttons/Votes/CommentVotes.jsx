import Votes from "./Votes";

function CommentVotes({ type, commentId, votes, variantColour }) {
    return <Votes type={type} commentId={ commentId } votes={ votes } variantColour={ variantColour }/>
}

export default CommentVotes;