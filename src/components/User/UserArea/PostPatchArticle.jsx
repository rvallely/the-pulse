/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTopics, patchArticle, postArticle } from '../../../utils/api';
import Nav from '../../Header/Nav';
import Header from '../../Header/Header';
import { UserContext } from '../../../contexts/User';

function PostPatchArticle() {
  const location = useLocation();

  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState(location.pathname === '/user/post-article' ? '' : location.state.subject.title);
  const [topic, setTopic] = useState(location.pathname === '/user/post-article' ? '' : location.state.subject.topic);
  const [body, setBody] = useState(location.pathname === '/user/post-article' ? '' : location.state.subject.body);
  const [error, setError] = useState(undefined);

  const navigate = useNavigate();
  const { loggedInUser: { username } } = useContext(UserContext);

  const postUserArticle = (e) => {
    e.preventDefault();

    postArticle({
      author: username,
      title,
      topic,
      body,
    }).then((postedArticle) => {
      navigate(`/articles/${postedArticle.id}`, { state: { variantColour: '#0464FF' } });
    }).catch((err) => {
      console.log('ERROR: ', err);
      if (err.response.data.msg === 'Bad Request: User not in the database.') {
        setError(
          <p className="error-color">
            Please
            {' '}
            <a href="/" className="error-color">log in</a>
            {' '}
            to post an article.
          </p>,
        );
      }
    });
  };

  const patchUserArticle = (e) => {
    e.preventDefault();

    patchArticle({
      id: location.state.subject.id,
      body: {
        title,
        topic,
        body,
      },
    }).then((patchedArticle) => {
      navigate(`/articles/${patchedArticle.id}`, { state: { variantColour: '#0464FF' } });
    }).catch((err) => {
      console.log('ERROR: ', err);
      if (err.response.data.msg === 'Bad Request: id or update values invalid.') {
        setError(
          <p className="error-color">
            Whoops, something went wrong! Please try again.
          </p>,
        );
      }
    });
  };
  useEffect(() => {
    getTopics().then((topicsFromAPI) => {
      setTopics(topicsFromAPI);
    });
  }, []);
  return (
    <div>
      <Header />
      <Nav selectedItem={topic} />
      <div style={{
        paddingTop: '10px',
        paddingBottom: '10px',
      }}
      >
        {error}
        <form
          style={{
            display: 'grid', maxWidth: '900px', margin: 'auto', textAlign: 'left',
          }}
          onSubmit={location.pathname === '/user/post-article' ? postUserArticle : patchUserArticle}
        >
          <label htmlFor="title">Title</label>
          <input
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="post-article-comment-form-element"
            style={{ border: 'none' }}
          />
          <br />
          <label htmlFor="topic">Topic</label>
          <select
            name="topic"
            required
            value={topic}
            className="post-article-comment-form-element"
            style={{ border: 'none' }}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option
              disabled
              value=""
            >
              Choose Your Topic
            </option>
            {topics.map((apiTopic) => (
              <option
                key={`post-article-form-option-${apiTopic.name}`}
                value={apiTopic.name}
              >
                {apiTopic.name}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            required
            className="post-article-comment-form-element single-article-content-container"
            value={body}
            style={{
              border: 'none',
              minHeight: '700px',
            }}
            onChange={(e) => setBody(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              className="action-btn primary-bckgrnd white"
              style={{ marginTop: '10px' }}
            >
              <strong>
                {location.pathname === '/user/post-article' ? 'Post' : 'Update'}
              </strong>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostPatchArticle;
