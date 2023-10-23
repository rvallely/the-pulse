import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function SortBy({ changeModalVisibility, modalVisibility, setModalVisibility }) {
    const [sortBy, setSortBy] = useState('');

    let navigate = useNavigate();
    const location = useLocation()

    const updateModalVisibility = () => {
        changeModalVisibility(
            {
                modalId:'sort-by-modal',
                modalVisibility,
                setModalVisibility,
            }
        )
    }
    const handleSortBySelection = () => {
        updateModalVisibility();

        if (location.search === '') {
            navigate(`${location.pathname}?${sortBy}`)
        } else {
            let query = `${location.pathname}?`;
            let topicPart = '';
            let authorPart = '';

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
            resetCheckboxValues();
            // and append the new sort by query part
            query += (topicPart + authorPart + sortBy);
            navigate(`${query}`); 
        }
    }
    
    const checkOnlyCurrentlySelectedInput = (e) => {
        const inputs = document.getElementsByClassName('sort-by-form-input');

        [inputs[0], inputs[1], inputs[2], inputs[3]].forEach((input) => {
            if (input.value !== e.target.value) {
                input.checked = false;
            } 
        });
        setSortBy(e.target.value);
    }

    const resetCheckboxValues = () => {
        const inputs = document.getElementsByClassName('sort-by-form-input');

        [inputs[0], inputs[1], inputs[2], inputs[3]].forEach((input) => {
                input.checked = false;
        });
        setSortBy('');
    }

    return (
    <div id="sort-by-modal" className='modal'>
        <div
        className="modal-content"
        style={{
            backgroundColor: '#FFFFFF',
            border: 'solid black',
            borderWidth: '1px',
            textAlign:'left',
            width: '200px',
            top: '41%',
            left: '60%'
        }}
        >
            <form id='sort-by-form'>
                <input
                type="checkbox"
                id="newest"
                name="newest"
                value="sort-by=created_at&order=DESC"
                className='sort-by-form-input'
                onClick={checkOnlyCurrentlySelectedInput}
                >
                </input>
                <label htmlFor="newest"> Newest</label><br></br>
                <input
                type="checkbox"
                id="oldest"
                name="oldest"
                value="sort-by=created_at&order=ASC"
                className='sort-by-form-input'
                onClick={checkOnlyCurrentlySelectedInput}
                >
                </input>
                <label htmlFor="oldest"> Oldest</label>
                <br></br>
                <input
                type="checkbox"
                id="most-comments"
                name="most-comments"
                value="sort-by=comment_count&order=DESC"
                className='sort-by-form-input'
                onClick={checkOnlyCurrentlySelectedInput}
                >
                </input>
                <label htmlFor="most-comments"> Most Comments</label>
                <br></br>
                <input
                type="checkbox"
                id="most-votes"
                name="most-votes"
                value="sort-by=votes&order=DESC"
                className='sort-by-form-input'
                onClick={checkOnlyCurrentlySelectedInput}
                >
                </input>
                <label htmlFor="most-votes"> Most Votes</label>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                    <button
                        type='button'
                        className="action-btn primary-bckgrnd white"
                        onClick={() => handleSortBySelection()}
                    >
                        Sort
                    </button>
                    <button
                        type='button'
                        className="action-btn tuna-bckgrnd white"
                        onClick={() => updateModalVisibility()}
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