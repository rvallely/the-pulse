import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SingleComment from './SingleComment';
import SortIcon from '../Sort/SortIcon';
import { getComments } from '../../utils/api';
import Header from '../Header/Header';
import Nav from '../Header/Nav';

function UserComments() {
  const [page] = useState(0);
  const [comments, setComments] = useState(undefined);

  const [searchParams] = useSearchParams();
  const author = searchParams.get('author');
  const sortBy = searchParams.get('sort-by');
  const order = searchParams.get('order');

  // TODO: add next previous btns like articles to change page on comments.
  useEffect(() => {
    getComments(
      {
        filterSortByParams: {
          author,
          sortBy,
          order,
        },
      },
      page,
    )
      .then((response) => {
        setComments(response);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  }, [page, order, sortBy, author]);

  if (!comments) {
    return <p>loading...</p>;
  }
  return (
    <div>
      <Header />
      <Nav />
      <div
        id="comments-container"
        style={{
          paddingTop: '5px',
          marginBottom: '30px',
          marginTop: '30px',
        }}
        className="single-article-content-container"
      >
        <div
          style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}
        >
          <h2>Your comments</h2>
          <SortIcon type="comments" variantColour="#0464FF" />
        </div>
        {comments.comments.map((comment) => (
          <SingleComment
            key={comment.id}
            comment={comment}
            variantColour="#0464FF"
            lastComment={comments.lastPage}
            userComment
          />
        ))}
      </div>

    </div>
  );
}

export default UserComments;
