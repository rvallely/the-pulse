import React, { useEffect, useState, useContext  }  from 'react';
import { useParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getArticles, getComments } from '../../utils/api';
import Header from '../Header/Header';
import Nav from '../Header/Nav';
import ArticleVotes from './Buttons/Votes/Votes';
import dateToUtcString from '../../utils/dateToUtcString';
import ArticleComments from '../Comments/ArticleComments';
import { UserContext } from '../../contexts/User';
import { changeModalVisibility } from '../../helpers/changeModalVisibility';
import EditAndDelete from '../EditAndDelete/EditAndDelete';

function SingleArticle() {
    const { articleId } = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [commentPosted, setCommentPosted] = useState(false);
    const [commentPage, setCommentPage] = useState(0);
    const { loggedInUser: { username } } = useContext(UserContext);
    // TODO: set and test error handling
    const [error, setError] = useState(null);

        const [searchParams, setSearchParams] = useSearchParams();
        const commentsSortBy = searchParams.get('sort-by')
        const commentsOrder = searchParams.get('order')
    

    const location = useLocation();
    const { variantColour } = location.state;

    let navigate = useNavigate();

    // TODO: add next and previos btns same as Articles to handle retrieving next comments
    useEffect(() => {
        getArticles({id: articleId}, 0).then((articleFromApi) => {
            // this preserves the line breaks correctly between paragraphs
            const htmlFormattedText = articleFromApi.articles[0].body.replace(/\n/g, '<br>');
            document.getElementById('article-body').innerHTML = htmlFormattedText;

            setArticle(articleFromApi.articles[0]);
            
            getComments({
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
            console.log('ERROR: ', err)
            setError({ err });
        });
    }, [articleId, commentPosted, commentsSortBy, commentsOrder, commentPage, comments])

    return (
        <div>
            <Header />
            <Nav />
            <div style={{
                paddingTop: '10px',
                paddingBottom: '10px',
                marginTop: '30px',
                marginBottom: '30px',
            }}
            className='single-article-content-container'>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <p style={{ color: variantColour}}>
                            {dateToUtcString(article.created_at)}
                        </p>
                        {
                            username === article.author
                            ?
                            <EditAndDelete article={article}/>
                            :
                            <p
                                style={{
                                    color: variantColour,
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }}
                                onClick={() => navigate(`/articles?author=${article.author}`)}
                            >
                                {article.author}
                            </p>
                        }
                </div>
                <h2 style={{ color: variantColour}}>
                    {article.title}
                </h2>
                <div id='article-body'>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
                    <ArticleVotes type={'article'} articleId={ articleId } votes={article.votes } variantColour={variantColour}/>
                    <p
                        style={{
                            color: variantColour,
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                        onClick={() => navigate(`/articles?topic=${article.topic}`)}
                    >
                        {`${article.topic}`}
                    </p>
                    <p
                        style={{
                            color: variantColour,
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                        onClick={() => changeModalVisibility({
                            modalId: 'comments-container',
                        })}
                    >
                        {article.comment_count + ' comments'}
                    </p>
                </div>
            </div>
            <ArticleComments
                comments={comments}
                variantColour={variantColour}
                articleId={articleId}
                setCommentPosted={setCommentPosted}
            />
        </div>
    )
}

export default SingleArticle;