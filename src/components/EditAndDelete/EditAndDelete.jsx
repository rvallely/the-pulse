import React from 'react';
import PropTypes from 'prop-types';
import editBlack from '../../assets/icons/editBlack.png';
import deleteBlack from '../../assets/icons/deleteBlack.png';

// eslint-disable-next-line no-unused-vars
function EditAndDelete({ type, subject }) {
  return (
    <div>
      <img
        className="rounded-border-on-hover"
        src={editBlack}
        style={{ height: '50px', padding: '10px' }}
        alt="edit icon"
      />
      <img
        className="rounded-border-on-hover"
        src={deleteBlack}
        style={{ height: '50px', padding: '10px' }}
        alt="delete icon"
      />
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
