import React, { useEffect, useState, useContext  }  from 'react';
import { useParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getArticles, getComments } from '../../utils/api';
import Header from '../Header/Header';
import Nav from '../Header/Nav';
import ArticleVotes from './Buttons/Votes/Votes';
import dateToUtcString from '../../utils/dateToUtcString';
import Comments from './Comments/Comments';
import { UserContext } from '../../contexts/User';
import editBlack from '../../assets/icons/editBlack.png';
import deleteBlack from '../../assets/icons/deleteBlack.png';
import { changeModalVisibility } from '../../helpers/changeModalVisibility';

function SingleArticle() {
    const { articleId } = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [commentPosted, setCommentPosted] = useState(false);
    const { loggedInUser: { username } } = useContext(UserContext);
    // TODO: set and test error handling
    const [error, setError] = useState(null);

        const [searchParams, setSearchParams] = useSearchParams();
        const commentsSortBy = searchParams.get('sort-by')
        const commentsOrder = searchParams.get('order')
    

    const location = useLocation();
    const { variantColour } = location.state;

    let navigate = useNavigate();

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
            }).then((commentsFromApi) => {
                    setComments(commentsFromApi); 
            });
            setCommentPosted(false);
        })
        .catch((err) => {
            console.log('ERROR: ', err)
            setError({ err });
        });
    }, [articleId, commentPosted, commentsSortBy, commentsOrder])

    return (
        <div>
            <Header />
            <Nav />
            <div style={{
                paddingTop: '10px',
                paddingBottom: '10px',
                marginTop: '30px',
            }}
            className='single-article-content-container'>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <p style={{ color: variantColour}}>
                            {dateToUtcString(article.created_at)}
                        </p>
                        {
                            username === article.author
                            ?
                            <div >
                                <img
                                    className='rounded-border-on-hover'
                                    src={editBlack} style={{ height: '50px', padding: '10px'}}
                                    alt='edit icon'
                                    //TODO: onclick go into edit article mode
                                >
                                </img>
                                <img
                                    className='rounded-border-on-hover'
                                    src={deleteBlack} style={{ height: '50px', padding: '10px'}}
                                    alt='delete icon'
                                    //TODO: onclick go into delete article mode
                                >
                                </img>
                            </div>
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
            <Comments
                comments={comments}
                variantColour={variantColour}
                articleId={articleId}
                setCommentPosted={setCommentPosted}
            />
        </div>
    )
}

export default SingleArticle;