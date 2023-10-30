import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Nav from '../Header/Nav';
import dateToUtcString from '../../utils/dateToUtcString';
import { getArticles } from '../../utils/api';
import NextPageButton from './Buttons/PageTurners/NextPageButton';
import PreviousPageButton from './Buttons/PageTurners/PreviousPageButton';
import ArticleVotes from './Buttons/Votes/Votes';
import colors from '../../utils/variantColours';

function Articles() {
  const [page, setPage] = useState(0);
  const [articles, setArticles] = useState({ articles: [] });

  const [, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic');
  const author = searchParams.get('author');
  const sortBy = searchParams.get('sort-by');
  const order = searchParams.get('order');

  const navigate = useNavigate();

  const navigateToArticle = (articleId, variantColour) => {
    navigate(`/articles/${articleId}`, { state: { variantColour } });
  };

  useEffect(() => {
    getArticles({
      topic,
      author,
      sortBy,
      order,
    }, page).then((result) => {
      setArticles(result);
      setError(null);
    })
      .catch((err) => {
        // TO DO: show error to user
        console.log('ERROR:', err);
        setError(err);
      });
  }, [page, topic, author, order, sortBy]);
  return (
    <div>
      <Header />
      <Nav selectedItem={topic} />
      <h2>
        {
        (() => {
          if (topic === null && author === null) {
            return 'All Articles';
          }
          if (topic && author) {
            return `${author} - ${topic}`;
          }
          if (topic && !author) {
            return topic;
          }
          return author;
        })()
        }
      </h2>
      {/**
             * TODO: Explore {author} articles by topic
             *       go get all topics author has articles on
             *       display inline here as scrollable div
             *       on click navigate to (/articles?author={author}&topic={topic})
             *       already set up on BE
             */}
      {articles.articles.length > 0
        ? (
          <div>
            <p>
              Page
              {' '}
              {page + 1}
            </p>
            {
                [0, 6, 12, 18, 24]
                  .slice(0, Math.ceil(articles.articles.length / 6)).map((group) => (
                    <div
                      className="grid-container article-grid-container"
                      key={group}
                    >
                      {articles.articles.slice(group, group + 6).map((article, index) => (
                        <div
                          key={`articleid-${article.id}`}
                          role="button"
                          tabIndex={0}
                          className={`grid-item article-grid-item article-item${index}`}
                          style={{ position: 'relative', cursor: 'pointer' }}
                          onClick={() => navigateToArticle(article.id, colors[index])}
                          onKeyDown={() => navigateToArticle(article.id, colors[index])}
                        >
                          <div style={{
                            marginTop: '0%',
                            marginLeft: '17.4px',
                            marginRight: '17.4px',
                            marginBottom: '0%',
                          }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <p style={{ color: colors[index] }}>{article.author}</p>
                              <p
                                style={{ color: colors[index] }}
                              >
                                {dateToUtcString(article.created_at)}
                              </p>
                            </div>
                            <h3 style={{ color: colors[index] }}>
                              {article.title}
                            </h3>
                            <p style={{ flex: 'grow' }}>
                              {
                                /**
                                  * This section handles how much of the article body should be
                                  * rendered, so as not to overflow the grid container it is in.
                                  */
                              (() => {
                                // If the article is in a large grid container...
                                if (
                                  index % 6 === 0
                                  || index === 0
                                  || (index - 5) === 0
                                  || (index - 5) % 6 === 0
                                ) {
                                  // ...and the title is will span 2 lines
                                  if (article.title.length > 52) {
                                    // return 900 characters
                                    return `${article.body.split('').slice(0, 900).join('')}...`;
                                  }
                                  // ...and the title will take only one line
                                  // return 970 characters
                                  return `${article.body.split('').slice(0, 970).join('')}...`;
                                }
                                // If the article is in a small grid container...
                                // ...and the title is will span 2 lines
                                if (article.title.length > 52) {
                                  // return 115 characters
                                  return `${article.body.split('').slice(0, 115).join('')}...`;
                                }
                                // ...and the title will take only one line
                                // return 184 characters
                                return `${article.body.split('').slice(0, 184).join('')}...`;
                              })()
                              }
                            </p>
                            <div style={{
                              position: 'absolute',
                              bottom: '0',
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '544px',
                              height: '50px',
                              marginBottom: '1%',
                            }}
                            >
                              <ArticleVotes type="disabled" articleId={article.id} votes={article.votes} variantColour={colors[index]} />
                              <p style={{ color: colors[index] }}>{`${article.comment_count} comments`}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))

                }
            <div>
              {/**
               * This section handles the correct rendering the NextPage and PreviousPage buttons.
               */
              // eslint-disable-next-line consistent-return
              (() => {
                // If it's the first page...
                if (page === 0) {
                  // ...and there are more articles to get from the DB
                  if (articles.lastPage === false) {
                    // return the NextPageButton
                    return (
                      <div style={{
                        margin: 'auto',
                        width: '1180px',
                        padding: '0px',
                        display: 'flex',
                        justifyContent: 'right',
                      }}
                      >
                        <NextPageButton setPage={setPage} page={page} />
                      </div>
                    );
                  }
                // If it's not the first page...
                // ...and there are no more articles to get from the DB
                } else if (articles.lastPage === true) {
                  // return the PreviousPageButton
                  return (
                    <div style={{
                      margin: 'auto',
                      width: '1180px',
                      padding: '0px',
                      display: 'flex',
                      justifyContent: 'left',
                    }}
                    >
                      <PreviousPageButton setPage={setPage} page={page} />
                    </div>
                  );
                // If it's not the first page...
                // ...and there are more articles to get from the DB
                } else {
                  // return the PreviousPageButton and the NextPageButton
                  return (
                    <div style={{
                      margin: 'auto',
                      display: 'flex',
                      justifyContent: 'space-between',
                      maxWidth: '1180px',
                      padding: '0px',
                    }}
                    >
                      <PreviousPageButton setPage={setPage} page={page} />
                      <NextPageButton setPage={setPage} page={page} />
                    </div>
                  );
                }
              })()
              }
            </div>
          </div>
        )
        : (
          // TODO: 'Be the first one to post an article' button. Takes user to post article.
          <p>
            No articles posted yet.
          </p>
        )}
    </div>
  );
}

export default Articles;
