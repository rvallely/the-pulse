import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import editBlack from '../../assets/icons/editBlack.png';
import deleteBlack from '../../assets/icons/deleteBlack.png';

function EditAndDelete({ type, subject }) {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', justifyContent: 'right' }}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => navigate(`/user/edit-${type}`, { state: { subject } })}
        onKeyDown={() => navigate(`/user/edit-${type}`, { state: { subject } })}
      >
        <img
          className="rounded-border-on-hover"
          src={editBlack}
          style={{ height: '50px', padding: '10px' }}
          alt="edit icon"
        />
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => navigate(`/user/delete-${type}`, { state: { subject } })}
        onKeyDown={() => navigate(`/user/delete-${type}`, { state: { subject } })}
      >
        <img
          className="rounded-border-on-hover"
          src={deleteBlack}
          style={{ height: '50px', padding: '10px' }}
          alt="delete icon"
        />
      </div>
    </div>
  );
}

export default EditAndDelete;

EditAndDelete.propTypes = {
  type: PropTypes.oneOf(['comment', 'article']).isRequired,
  subject: PropTypes.oneOfType([
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
      topic: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      comment_count: PropTypes.string.isRequired,
    }),
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      article_id: PropTypes.number.isRequired,
    }),
  ]).isRequired,
};
