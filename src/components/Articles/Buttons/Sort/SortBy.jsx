import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { changeModalVisibility } from '../../../../helpers/changeModalVisibility';

function SortBy({ type, variantColour }) {
    const [sortBy, setSortBy] = useState('');

    let navigate = useNavigate();
    const location = useLocation()

    const handleSortBySelection = () => {
        if (location.search === '') {
            navigate(`${location.pathname}?${sortBy}`, { state: { variantColour }})
        } else {
            let query = `${location.pathname}?`;
            let topicPart = '';
            let authorPart = '';

            if (type === 'articles') {
                // preserve the author and topic if they exist
                if (location.search.includes('topic') || location.search.includes('author')) {
                    const queryParts = location.search.split('=').map((part) => {
                        if (part.includes('?')) {
                          return part.split('?')
                        }
                          if (part.includes('&')) {
                          return part.split('&')
                        }
                        return part;
                      }).flat()
    
                    const topicIndex = queryParts.indexOf('topic');
                    if (queryParts.indexOf('topic') > -1) {
                        topicPart = `topic=${queryParts[topicIndex + 1]}&`
                    }
    
                    const authorIndex = queryParts.indexOf('author');
                    if (queryParts.indexOf('author') > -1) {
                        authorPart = `author=${queryParts[authorIndex + 1]}&`
                    }
                }
            }

            // and append the new sort by query part
            query += (topicPart + authorPart + sortBy);
            navigate(`${query}`, { state: { variantColour }}); 
        }
    }

        const handleCheckboxTicksAndSetState = (e, action) => {
            const inputs = document.getElementsByClassName(`${type}-sort-by-form-input`);

            const numberOfInputs = {
                comments: 3,
                articles: 4,
            }
    
            const inputsList = [];
            for (let i = 0; i < numberOfInputs[type]; i ++) {
                inputsList.push(inputs[i]);
            }

            const sortByValue = action === 'reset' ? '' : e.target.value;
            inputsList.forEach((input) => {
                if (action === 'reset' || (action === 'select-single-box' && input.value !== e.target.value)) {
                    input.checked = false;
                } 
            });
            setSortBy(sortByValue);
        }

    return (
        <div
            id={`${type}-sort-by-modal`}
            className='modal'
        >
            <div
                id={`${type}-sort-by-modal-content`}
                className="modal-content"
                style={{
                    backgroundColor: '#FFFFFF',
                    border: 'solid black',
                    borderWidth: '1px',
                    textAlign:'left',
                    width: '200px',
                }}
            >
                <form id='sort-by-form'>
                    <input
                    type="checkbox"
                    id="newest"
                    name="newest"
                    value="sort-by=created_at&order=DESC"
                    className={`${type}-sort-by-form-input`}
                    onClick={(e) => handleCheckboxTicksAndSetState(e, 'select-single-box')}
                    >
                    </input>
                    <label htmlFor="newest"> Newest</label><br></br>
                    <input
                    type="checkbox"
                    id="oldest"
                    name="oldest"
                    value="sort-by=created_at&order=ASC"
                    className={`${type}-sort-by-form-input`}
                    onClick={(e) => handleCheckboxTicksAndSetState(e, 'select-single-box')}
                    >
                    </input>
                    <label htmlFor="oldest"> Oldest</label>
                    <br></br>
                    {
                    type === 'articles'
                    ?
                    <div>
                    <input
                    type="checkbox"
                    id="most-comments"
                    name="most-comments"
                    value="sort-by=comment_count&order=DESC"
                    className={`${type}-sort-by-form-input`}
                    onClick={(e) => handleCheckboxTicksAndSetState(e, 'select-single-box')}
                    >
                    </input>
                    <label htmlFor="most-comments"> Most Comments</label>
                    <br></br>
                    </div>
                    :
                    <div></div>
                    }
                    <input
                    type="checkbox"
                    id="most-votes"
                    name="most-votes"
                    value="sort-by=votes&order=DESC"
                    className={`${type}-sort-by-form-input`}
                    onClick={(e) => handleCheckboxTicksAndSetState(e, 'select-single-box')}
                    >
                    </input>
                    <label htmlFor="most-votes"> Most Votes</label>
                    <br></br>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                        <button
                            type='button'
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
                            type='button'
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
    )
}

export default SortBy;