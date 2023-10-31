import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { patchComment } from '../../../utils/api';

function PatchComment() {
  const location = useLocation();
  const [body, setBody] = useState(location.state.subject.body);
  const [error, setError] = useState(undefined);

  const navigate = useNavigate();

  const patchUserComment = (e) => {
    e.preventDefault();
    patchComment({ id: location.state.subject.id, body: { body } }).then(() => {
      navigate(`/articles/${location.state.subject.article_id}`, { state: { variantColour: '#0464FF' } });
    })
      .catch((err) => {
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

  return (
    <div style={{
      paddingBottom: '20px',
      paddingTop: '20px',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      {error && <p className="error-color">{error}</p>}
      <form onSubmit={patchUserComment}>
        <textarea
          name="post-comment-body"
          required
          className="post-article-comment-form-element"
          style={{
            border: '2px solid #EBEFF4',
            minHeight: '150px',
            minWidth: '80vw',
          }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="submit"
            className="action-btn white"
                // TODO onHover change color to yellow same as other action btns
            style={{ backgroundColor: '#0464FF' }}
          >
            <strong>
              Update
            </strong>
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatchComment;
