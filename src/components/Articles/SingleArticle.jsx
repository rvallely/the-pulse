import React, { useEffect, useState, useContext } from 'react';
import {
  useParams, useLocation, useSearchParams,
} from 'react-router-dom';
import { getArticles, getComments } from '../../utils/api';
import Header from '../Header/Header';
import Nav from '../Header/Nav';
import ArticleVotes from './Buttons/Votes/ArticleVotes';
import dateToUtcString from '../../utils/dateToUtcString';
import ArticleComments from '../Comments/ArticleComments';
import { UserContext } from '../../contexts/User';
import changeModalVisibility from '../../helpers/changeModalVisibility';
import EditAndDelete from '../EditAndDelete/EditAndDelete';

function SingleArticle() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(undefined);
  const [articleBody, setArticleBody] = useState(<p>...loading</p>);
  const [comments, setComments] = useState(undefined);
  const [commentPosted, setCommentPosted] = useState(false);
  const [commentPage] = useState(0);
  const { loggedInUser: { username } } = useContext(UserContext);
  // TODO: set and test error handling
  const [, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const commentsSortBy = searchParams.get('sort-by');
  const commentsOrder = searchParams.get('order');

  const location = useLocation();
  const { variantColour } = location.state;

  const formattedArticleBody = document.createElement('div');
  // TODO: add next and previous btns same as Articles to handle retrieving next comments
  useEffect(() => {
    getArticles({ id: articleId }, 0).then((articleFromApi) => {
      // this preserves the line breaks correctly between paragraphs
      const htmlFormattedText = articleFromApi.articles[0].body.replace(/\n/g, '<br>');
      formattedArticleBody.innerHTML = htmlFormattedText;
      setArticleBody(formattedArticleBody);

      setArticle(articleFromApi.articles[0]);

      getComments(
        {
          articleId,
          filterSortByParams: {
            sortBy: commentsSortBy,
            order: commentsOrder,
          },
        },
        commentPage,
      ).then((commentsFromApi) => {
        setComments(commentsFromApi.comments);
      });
      setCommentPosted(false);
    })
      .catch((err) => {
        console.log('ERROR: ', err);
        setError({ err });
      });
  }, [articleId, commentPosted, commentsSortBy, commentsOrder, commentPage]);

  if (!comments) {
    return <p>loading...</p>;
  }
  return (
    <div>
      <Header />
      <Nav />
      <div
        style={{
          paddingTop: '10px',
          paddingBottom: '10px',
          marginTop: '30px',
          marginBottom: '30px',
        }}
        className="single-article-content-container"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ color: variantColour }}>
            {dateToUtcString(article.created_at)}
          </p>
          {username === article.author
            ? <EditAndDelete type="article" subject={article} />
            : (
              <p>
                <a
                  style={{
                    color: variantColour,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  href={`/articles?author=${article.author}`}
                >
                  {article.author}
                </a>
              </p>
            )}
        </div>
        <h2 style={{ color: variantColour }}>
          {article.title}
        </h2>
        {formattedArticleBody && (
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: articleBody.innerHTML }}
          />
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          <ArticleVotes type="article" articleId={articleId} votes={article.votes} variantColour={variantColour} />
          <p>
            <a
              style={{
                color: variantColour,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              href={`/articles?topic=${article.topic}`}
            >
              {`${article.topic}`}
            </a>
          </p>
          <button
            type="button"
            style={{
              color: variantColour,
              cursor: 'pointer',
              textDecoration: 'underline',
              border: 'none',
              backgroundColor: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
            }}
            onClick={() => changeModalVisibility({
              modalId: 'comments-container',
            })}
          >
            {`${article.comment_count} comments`}
          </button>
        </div>
      </div>
      <ArticleComments
        comments={comments}
        variantColour={variantColour}
        articleId={articleId}
        setCommentPosted={setCommentPosted}
      />
    </div>
  );
}

export default SingleArticle;
