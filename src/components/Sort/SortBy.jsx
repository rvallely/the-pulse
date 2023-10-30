/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import changeModalVisibility from '../../helpers/changeModalVisibility';
import colors from '../../utils/variantColours';

function SortBy({ type, variantColour }) {
  const [sortBy, setSortBy] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleSortBySelection = () => {
    if (location.search === '') {
      navigate(`${location.pathname}?${sortBy}`, { state: { variantColour } });
    } else {
      let query = `${location.pathname}?`;
      let topicPart = '';
      let authorPart = '';

      // preserve the author and topic if they exist
      if (location.search.includes('topic') || location.search.includes('author')) {
        const queryParts = location.search.split('=').map((part) => {
          if (part.includes('?')) {
            return part.split('?');
          }
          if (part.includes('&')) {
            return part.split('&');
          }
          return part;
        }).flat();

        const topicIndex = queryParts.indexOf('topic');
        if (queryParts.indexOf('topic') > -1) {
          topicPart = `topic=${queryParts[topicIndex + 1]}&`;
        }

        const authorIndex = queryParts.indexOf('author');
        if (queryParts.indexOf('author') > -1) {
          authorPart = `author=${queryParts[authorIndex + 1]}&`;
        }
      }

      // and append the new sort by query part
      query += (topicPart + authorPart + sortBy);
      navigate(`${query}`, { state: { variantColour } });
    }
  };

  const handleCheckboxTicksAndSetState = (e, action) => {
    const inputs = document.getElementsByClassName(`${type}-sort-by-form-input`);

    const numberOfInputs = {
      comments: 3,
      articles: 4,
    };

    const inputsList = [];
    for (let i = 0; i < numberOfInputs[type]; i += 1) {
      inputsList.push(inputs[i]);
    }

    const sortByValue = action === 'reset' ? '' : e.target.value;
    inputsList.forEach((input) => {
      if (action === 'reset' || (action === 'select-single-box' && input.value !== e.target.value)) {
        // eslint-disable-next-line no-param-reassign
        input.checked = false;
      }
    });
    setSortBy(sortByValue);
  };

  return (
    <div
      id={`${type}-sort-by-modal`}
      className="modal"
    >
      <div
        id={`${type}-sort-by-modal-content`}
        className="modal-content"
        style={{
          backgroundColor: '#FFFFFF',
          border: 'solid black',
          borderWidth: '1px',
          textAlign: 'left',
          width: '200px',
        }}
      >
        <form id="sort-by-form">
          <input
            type="checkbox"
            id="newest"
            name="newest"
            value="sort-by=created_at&order=DESC"
            className={`${type}-sort-by-form-input`}
            onClick={(e) => handleCheckboxTicksAndSetState(e, 'select-single-box')}
          />
          <label htmlFor="newest"> Newest</label>
          <br />
          <input
            type="checkbox"
            id="oldest"
            name="oldest"
            value="sort-by=created_at&order=ASC"
            className={`${type}-sort-by-form-input`}
            onClick={(e) => handleCheckboxTicksAndSetState(e, 'select-single-box')}
          />
          <label htmlFor="oldest"> Oldest</label>
          <br />
          {
            // eslint-disable-next-line consistent-return
            (() => {
              if (type === 'articles') {
                return (
                  <div>
                    <input
                      type="checkbox"
                      id="most-comments"
                      name="most-comments"
                      value="sort-by=comment_count&order=DESC"
                      className={`${type}-sort-by-form-input`}
                      onClick={(e) => handleCheckboxTicksAndSetState(e, 'select-single-box')}
                    />
                    <label htmlFor="most-comments"> Most Comments</label>
                    <br />
                  </div>
                );
              }
            })()
            }
          <input
            type="checkbox"
            id="most-votes"
            name="most-votes"
            value="sort-by=votes&order=DESC"
            className={`${type}-sort-by-form-input`}
            onClick={(e) => handleCheckboxTicksAndSetState(e, 'select-single-box')}
          />
          <label htmlFor="most-votes"> Most Votes</label>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <button
              type="button"
              className="action-btn primary-bckgrnd white"
              onClick={() => {
                changeModalVisibility({
                  modalId: `${type}-sort-by-modal`,
                });
                handleSortBySelection();
                handleCheckboxTicksAndSetState(null, 'reset');
              }}
            >
              Sort
            </button>
            <button
              type="button"
              className="action-btn tuna-bckgrnd white"
              onClick={() => {
                changeModalVisibility({
                  modalId: `${type}-sort-by-modal`,
                });
                handleCheckboxTicksAndSetState(null, 'reset');
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SortBy;

SortBy.propTypes = {
  type: PropTypes.oneOf(['articles', 'comments']).isRequired,
  variantColour: PropTypes.oneOf(colors).isRequired,
};
