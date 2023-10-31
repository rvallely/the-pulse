import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserContext } from '../../../contexts/User';
import changeModalVisibility from '../../../helpers/changeModalVisibility';
import { deleteArticleAndAssociatedComments, deleteComments } from '../../../utils/api';

function DeleteArticleOrComment({
  type, id, setCommentDeleted, setError,
}) {
  const location = useLocation();
  const { loggedInUser: { username } } = useContext(UserContext);
  const navigate = useNavigate();

  // TODO handle errors
  const handleDeleteContent = () => {
    if (location.pathname.includes('comments')) {
      deleteComments(id).then(() => {
        changeModalVisibility({ modalId: `${type}-delete-content-modal` });
        setCommentDeleted(true);
      }).catch((err) => {
        console.log('ERROR: ', err);
        changeModalVisibility({ modalId: `${type}-delete-content-modal` });
        setError('Failed to delete comment.');
      });
    } else if (location.pathname.includes('articles')) {
      deleteArticleAndAssociatedComments(id).then(() => {
        changeModalVisibility({ modalId: `${type}-delete-content-modal` });
        navigate(`/articles?author=${username}`);
      }).catch((err) => {
        console.log('ERROR: ', err);
        changeModalVisibility({ modalId: `${type}-delete-content-modal` });
        // setError('Failed to delete article.');
        alert('Failed to delete article.');
      });
    }
  };
  return (
    <div
      id={`${type}-delete-content-modal`}
      className="modal"
    >
      <div
        id={`${type}-delete-content-modal-content`}
        className="modal-content mischka-bckgrnd"
        style={{
          border: 'solid black',
          borderWidth: '1px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <p>
          Are you sure you want to delete this content?
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="button"
            className="auth-form-input error-bckgrnd"
            style={{
              position: 'relative',
              width: '150px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              textIndent: '0px',
              borderRadius: '5px',
              border: '1px solid #444',
              margin: '0',
              color: '#FFFFFF',
            }}
            onClick={handleDeleteContent}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteArticleOrComment;

DeleteArticleOrComment.propTypes = {
  // TODO fix lazy loading id and type prop types causing error
  type: PropTypes.oneOf(['article', 'comment']).isRequired,
  id: PropTypes.number.isRequired,
  setCommentDeleted: PropTypes.func,
  setError: PropTypes.func,
};

DeleteArticleOrComment.defaultProps = {
  setCommentDeleted: undefined,
  setError: undefined,
};
