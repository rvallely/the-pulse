import { useContext, useState } from 'react';
import { UserContext } from '../../../../contexts/User';
import { patchArticle, patchComment } from '../../../../utils/api';
import thumbsUp from '../../../../assets/icons/votes.png';

const Votes = ({ type, articleId, commentId, votes, variantColour }) => {
    const [userVote, setUserVote ] = useState(0);
    const { loggedInUser: { username }, setLoggedInUser } = useContext(UserContext);

    const addVote = () => {
        /**
         * Only allow user to vote once per page load of article.
         */
        if (type !== 'disabled') {
            if (userVote === 0) {
                setUserVote(1);
                if (type === 'article') {
                    patchArticle({ id: articleId, body: { votes: votes + 1 }}).catch((err) => {
                        // TODO: set error and show
                        console.log('ERROR: ', err)
                        setUserVote(0);
                    });             
                }
                if (type === 'comment') {
                    patchComment({ id: commentId, body: { votes: votes + 1 }}).catch((err) => {
                        // TODO: set error and show
                        console.log('ERROR: ', err)
                        setUserVote(0);
                    }); 
                }
                document.getElementById(type === 'article' ? `${type}-vote-button`: `${commentId}-${type}-vote-button`).style.cursor = 'initial';
                document.getElementById(type === 'article' ? `${type}-vote-button`: `${commentId}-${type}-vote-button`).disabled= true;
            }
        }
    }

    return (
        <button
            id={type === 'article' ? `${type}-vote-button`: `${commentId}-${type}-vote-button`}
            className="action-btn votes-action-btn white"
            style={{
                backgroundColor: variantColour,
                height: '46px',
                width: '70px',
                display: 'flex',
                // border: 'solid pink',
                marginTop: '0',
                padding: '0px',
                alignItems: 'center',
                cursor: username === 'Log in' || type === 'disabled' ? 'initial': 'pointer'
            }}
            disabled={type === 'disabled'}
            onClick={
                username === 'Log in'
                ?
                () => alert('Please log in to vote.')
                :
                () => addVote()
            }
        >
            <p style={{ fontSize: '1.25rem', marginLeft: '6px', marginRight: '6px'}}>
                {Number(votes) + userVote}
            </p>
            <img style={{height: '35px'}} src={thumbsUp} alt='votes thumbs up icon'>
            </img>
        </button>
    )
    
}

export default Votes;