import Header from "../General/Header";
import Nav from "../General/Nav";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import dateToUtcString from '../../utils/dateToUtcString';
import { getArticles } from '../../utils/api';
import votes from '../../assets/icons/votes.png';
import NextPageButton from "./Buttons/NextPageButton";
import PreviousPageButton from "./Buttons/PreviousPageButton";

function Articles() {
    const [page, setPage] = useState(0);
    const [articles, setArticles] = useState({ articles: []});

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const topic = searchParams.get('topic')
    const author = searchParams.get('author')
    const sortBy = searchParams.get('sort-by')
    const order = searchParams.get('order')

    useEffect(() => {
        getArticles({
            topic,
            author,
            sortBy,
            order,
        },page).then((result) => {
            setArticles(result);
            setIsLoading(false);
            setError(null);
        })
        .catch((err) => {
            setError(err);
            setIsLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, topic, author, order, sortBy ]);
    return (
        <div>
            <Header />
            <Nav selectedItem={topic}/>
            <h2>{topic === null ? 'All Articles': topic}</h2>
            <p>Page {page + 1}</p>
            {articles.articles.length > 0
            ?
            <div>
                {
                [0, 6, 12, 18, 24].slice(0, Math.ceil(articles.articles.length / 6)).map((group) => {
                    return (
                        <div className="grid-container article-grid-container">
                            {articles.articles.slice(group, group + 6).map((article, index) => {
                                const colors = ['#0464FF', '#1FC667', '#00C4C4', '#FA8700', '#F974A6', '#8C52FF'];
                                return (
                                    <div className={`grid-item article-grid-item article-item${index}`} style={{ position : 'relative' }}>
                                    <div style={{
                                        marginTop: '0%',
                                        marginLeft: '17.4px',
                                        marginRight: '17.4px',
                                        marginBottom: '0%',
                                        // border: 'solid red',
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
                                            // border: 'solid green',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '544px',
                                            height: '50px',
                                            marginBottom: '1%',
                                        }}>
                                            <div
                                            className="action-btn votes-action-btn white"
                                            style={{
                                                backgroundColor: colors[index],
                                                height: '46px',
                                                width: '70px',
                                                display: 'flex',
                                                // border: 'solid pink',
                                                marginTop: '0',
                                                
                                                padding: '0px',
                                                alignItems: 'center',
                                                cursor: 'initial'
                                            }}>
                                            <p style={{ fontSize: '1.25rem', marginLeft: '6px', marginRight: '6px'}}>{article.votes}</p>
                                            <img style={{height: '35px'}} src={votes} alt='votes thumbs up icon'></img>
                                            </div>
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
                            border: 'solid pink',
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
                            border: 'solid pink',
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
            ''
            }
        </div> 
    )
}

export default Articles;