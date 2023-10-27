import Header from "../Header/Header";
import Nav from "../Header/Nav";
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import dateToUtcString from '../../utils/dateToUtcString';
import { getArticles } from '../../utils/api';
import NextPageButton from "./Buttons/PageTurners/NextPageButton";
import PreviousPageButton from "./Buttons/PageTurners/PreviousPageButton";
import ArticleVotes from "./Buttons/Votes/Votes";

function Articles() {
    const [page, setPage] = useState(0);
    const [articles, setArticles] = useState({ articles: []});

    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const topic = searchParams.get('topic')
    const author = searchParams.get('author')
    const sortBy = searchParams.get('sort-by')
    const order = searchParams.get('order')

    let navigate = useNavigate();

    const navigateToArticle = (articleId, variantColour) => {
        navigate(`/articles/${articleId}`, { state: { variantColour } });
    }

    useEffect(() => {
        getArticles({
            topic,
            author,
            sortBy,
            order,
        },page).then((result) => {
            setArticles(result);
            setError(null);
        })
        .catch((err) => {
            // TO DO: show error to user
            console.log('ERROR:', err)
            setError(err);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, topic, author, order, sortBy ]);
    return (
        <div>
            <Header />
            <Nav selectedItem={topic}/>
            <h2>{
                topic === null && author === null
                ?
                'All Articles'
                : 
                topic && author
                    ?
                    `${author} - ${topic}`
                    :
                    topic && !author
                        ?
                        topic
                        :
                        author
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
            ?
            <div>
                <p>Page {page + 1}</p>
                {
                [0, 6, 12, 18, 24].slice(0, Math.ceil(articles.articles.length / 6)).map((group) => {
                    return (
                        <div className="grid-container article-grid-container">
                            {articles.articles.slice(group, group + 6).map((article, index) => {
                                const colors = ['#0464FF', '#1FC667', '#00C4C4', '#FA8700', '#F974A6', '#8C52FF'];
                                return (
                                    <div
                                        className={`grid-item article-grid-item article-item${index}`}
                                        style={{ position : 'relative', cursor: 'pointer' }}
                                        onClick={() => navigateToArticle(article.id, colors[index])}
                                    >
                                    <div style={{
                                        marginTop: '0%',
                                        marginLeft: '17.4px',
                                        marginRight: '17.4px',
                                        marginBottom: '0%',
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                            <p style={{ color: colors[index] }}>{article.author}</p>
                                            <p style={{ color: colors[index] }}>{dateToUtcString(article.created_at)}</p>
                                        </div>
                                        <h3 style={{ color: colors[index] }}>
                                            {article.title}
                                        </h3>
                                        <p style={{ flex: 'grow'}}>
                                        {
                                        index % 6 === 0 || index === 0 || (index - 5) === 0 || (index - 5) % 6 === 0
                                        ?
                                        (
                                            article.title.length > 52
                                            ?
                                            article.body.split('').slice(0, 900).join('') + '...'
                                            :
                                            article.body.split('').slice(0, 970).join('') + '...'
                                        )
                                        :
                                        (
                                            article.title.length > 52
                                            ?
                                            article.body.split('').slice(0, 115).join('') + '...'
                                            :
                                            article.body.split('').slice(0, 184).join('') + '...'
                                        )
                                        }
                                        </p>
                                        <div style={{
                                            position : 'absolute',
                                            bottom: '0',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '544px',
                                            height: '50px',
                                            marginBottom: '1%',
                                        }}>
                                            <ArticleVotes type={'disabled'} articleId={ article.id } votes={article.votes } variantColour={colors[index]}/>
                                            <p style={{ color: colors[index] }}>{article.comment_count + ' comments'}</p>
                                        </div>
                                    </div>
                                    </div>
                                )
                            })}
                        </div>
                    );
                })
                
                }
                <div>
                    {
                    page === 0
                    ?
                        articles.lastPage === false
                        ?
                        <div style={{
                            margin: 'auto',
                            width: '1180px',
                            padding: '0px',
                            // border: 'solid pink',
                            display: 'flex',
                            justifyContent: "right"
                            }}
                        >
                            <NextPageButton setPage={setPage} page={page}/>
                        </div>
                        :
                        ''
                    :
                        articles.lastPage === true
                        ?
                        <div style={{
                            margin: 'auto',
                            width: '1180px',
                            padding: '0px',
                            // border: 'solid pink',
                            display: 'flex',
                            justifyContent: "left"
                            }}
                        >
                            <PreviousPageButton setPage={setPage} page={page}/> 
                        </div>
                        :
                        <div style={{
                            margin: 'auto',
                            display: 'flex',
                            justifyContent: 'space-between',
                            maxWidth: '1180px',
                            padding: '0px'
                            }}
                        >
                            <PreviousPageButton setPage={setPage} page={page}/> 
                            <NextPageButton setPage={setPage} page={page}/>
                        </div>
                }
                </div>
            </div>
            :
            // TODO: 'Be the first one to post an article' button. Takes user to post article.
            <p>
                No articles posted yet.
            </p>
            }
        </div> 
    )
}

export default Articles;