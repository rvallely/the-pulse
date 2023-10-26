import Header from "../../Header/Header";
import Nav from "../../Header/Nav";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, defaultUserContext } from "../../../contexts/User";
import commentsIcon from '../../../assets/icons/comments.png';
import articlesIcon from '../../../assets/icons/articles.png';
import postArticleIcon from '../../../assets/icons/postArticle.png';
import logOutIcon from '../../../assets/icons/logOut.png';

function UserArea() {
    const { loggedInUser: { username }, setLoggedInUser } = useContext(UserContext);

    const navigate = useNavigate(); 
    return (
        <div>
            <Header />
            <Nav />
            <h2>
                Welcome {username}!
            </h2>
            <div className="grid-container user-area-grid-container">
                <div
                    className="grid-item topic-user-area-grid-item user-area-grid-item1"
                    onClick={() => navigate(`/comments?page=0`)}
                >
                    <p className='topic-grid-title-font text-align-centre' style={{ width: '100%'}}>
                        My Comments
                    </p>
                    <div style={{ height: '50%', margin: 'auto', marginTop: '5%'}}>
                        <img
                        style={{ height:'90%', objectFit: 'contain' }}
                        src={commentsIcon}
                        alt='comments icon'></img>
                    </div>
                </div>
                <div
                    className="grid-item topic-user-area-grid-item user-area-grid-item2"
                    onClick={() => navigate(`/articles?author=${username}`)}
                >
                <p className='topic-grid-title-font text-align-centre' style={{ width: '100%'}}>
                        My Articles
                    </p>
                    <div style={{ height: '50%', margin: 'auto', marginTop: '5%'}}>
                        <img
                        style={{ height:'90%', objectFit: 'contain' }}
                        src={articlesIcon}
                        alt='Articles icon'></img>
                    </div>
                </div>
                <div
                    className="grid-item topic-user-area-grid-item user-area-grid-item3"
                    onClick={() => navigate(`/user/post-article`)}
                >
                <p className='topic-grid-title-font text-align-centre' style={{ width: '100%'}}>
                        Post an article
                    </p>
                    <div style={{ height: '50%', margin: 'auto', marginTop: '5%'}}>
                        <img
                        style={{ height:'90%', objectFit: 'contain' }}
                        src={postArticleIcon}
                        alt='post article icon'></img>
                    </div>
                </div>
                <div
                    className="grid-item topic-user-area-grid-item user-area-grid-item4"
                    onClick={() => {
                        localStorage.removeItem('loggedInUser');
                        setLoggedInUser(defaultUserContext);
                        navigate('/');
                    }}
                >
                <p className='topic-grid-title-font text-align-centre' style={{ width: '100%'}}>
                        Log out
                    </p>
                    <div style={{ height: '50%', margin: 'auto', marginTop: '5%'}}>
                        <img
                        style={{ height:'90%', objectFit: 'contain' }}
                        src={logOutIcon}
                        alt='log out icon'></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserArea;