import React, { useEffect, useState  }  from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getComments, getSingleArticle } from '../../utils/api';
import Header from '../General/Header';
import Nav from '../General/Nav';
import ArticleVotes from './Buttons/Votes/Votes';
import dateToUtcString from '../../utils/dateToUtcString';
import Comments from './Comments/Comments';

function SingleArticle() {
    const { articleId } = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [commentSortByAndOrder, setCommentSortByAndOrder] = useState({
        sortBy: '',
        order: '',
    });

    // TODO: set and test error handling
    const [error, setError] = useState(null);

    const location = useLocation();
    const { variantColour } = location.state;

    let navigate = useNavigate();

    useEffect(() => {
        getSingleArticle(articleId).then((articleFromApi) => {
            // this preserves the line breaks correctly between paragraphs
            const htmlFormattedText = articleFromApi.body.replace(/\n/g, '<br>');
            document.getElementById('article-body').innerHTML = htmlFormattedText;

            setArticle(articleFromApi);
            
            getComments(
                articleId,
                {
                    sortBy: commentSortByAndOrder.sortBy,
                    order: commentSortByAndOrder.order,
                })
                .then((commentsFromApi) => {
                    setComments(commentsFromApi); 
            });
        })
        .catch((err) => {
            console.log('ERROR: ', err)
            setError({ err });
        });
    }, [articleId])

    return (
        <div>
            <Header />
            <Nav />
            <div style={{
                paddingTop: '10px',
                paddingBottom: '10px',
            }}
            className='single-article-content-container'>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <p style={{ color: variantColour}}>
                            {dateToUtcString(article.created_at)}
                        </p>
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
                        // onClick={navigate('TODO/toggleCommentVisibility')}
                    >
                        {article.comment_count + ' comments'}
                    </p>
                </div>
            </div>
            <Comments comments={comments} variantColour={variantColour}/>
        </div>
    )
}

export default SingleArticle;