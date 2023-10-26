import { useEffect, useState, useContext } from "react";
import { getTopics, postArticle } from "../../../utils/api";
import Nav from "../../Header/Nav";
import Header from "../../Header/Header";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/User";

function PostArticle() {
    const [topics, setTopics] = useState([]);
    const [title, setTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(undefined);

    const navigate = useNavigate();
    const { loggedInUser: { username } } = useContext(UserContext);

    const postUserArticle = () => {
        postArticle({
            author: username,
            title,
            topic,
            body,
        }).then((postedArticle) => {
            navigate(`/articles/${postedArticle.id}`, { state: { variantColour: '#0464FF'}});
        }).catch((err) => {
            console.log('ERROR: ', err)
            if (err.response.data.msg === 'Bad Request: User not in the database.') {
                setError(
                <p className="error-color">
                    Please{' '}
                    <a href='/' className="error-color">log in</a>
                    {' '}to post an article.
                </p>)
            }
        });
    }
    useEffect(() => {
        getTopics().then((topicsFromAPI) => {
            setTopics(topicsFromAPI);
        });
    }, []);
    return (
        <div>
            <Header />
            <Nav selectedItem={topic}/>
            <div style={{
                paddingTop: '10px',
                paddingBottom: '10px',
            }}
            >
                {error}
                <form
                    style={{ display: 'grid', maxWidth: '900px', margin: 'auto', textAlign: 'left'}}
                >
                    <label htmlFor="title"> Title</label>
                    <input
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="post-article-comment-form-element"
                        style={{ border: 'none'}}
                    />
                    <br></br>
                    <label htmlFor="topic"> Topic</label>
                    <select
                        name="topic"
                        required
                        value={topic}
                        className="post-article-comment-form-element"
                        style={{ border: 'none'}}
                        onChange={(e) => setTopic(e.target.value)}
                    >
                        <option
                            disabled
                            value=''
                        >
                            Choose Your Topic
                        </option>
                        {topics.map((topic) => {
                            return <option
                                value={topic.name}
                                >
                                    {topic.name}
                                </option>
                        })}
                    </select>
                    <br></br>
                    <label htmlFor="body"> Body</label>
                    <textarea
                        name='body'
                        required
                        className="post-article-comment-form-element single-article-content-container"
                        value={body}
                        style={{
                            border: 'none',
                            minHeight: '700px'
                        }}
                        onChange={(e) => setBody(e.target.value)}
                    >
                        
                    </textarea>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            type='button'
                            className="action-btn primary-bckgrnd white"
                            style={{ marginTop: '10px' }}
                            onClick={postUserArticle}
                        >
                            <strong>
                                Post
                            </strong>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostArticle;