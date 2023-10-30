import React from 'react';
import PropTypes from 'prop-types';

function NextPageButton({ setPage, page }) {
  return (
    <button
      className="action-btn page-action-btn primary-bckgrnd white"
      type="button"
      onClick={() => setPage(page + 1)}
    >
      <strong>Next</strong>
    </button>
  );
}

export default NextPageButton;

NextPageButton.propTypes = {
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
