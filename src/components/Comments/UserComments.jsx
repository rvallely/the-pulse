import SingleComment from "./SingleComment";
import { useEffect, useState } from "react";
import SortIcon from "../Sort/SortIcon";
import { getComments } from "../../utils/api";
import Header from "../Header/Header";
import Nav from "../Header/Nav";
import { useSearchParams } from "react-router-dom";

function UserComments() {
    const [page, setPage] = useState(0);
    const [comments, setComments] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const author = searchParams.get('author')
    const sortBy = searchParams.get('sort-by')
    const order = searchParams.get('order')

    //TODO: add next previous btns like articles to change page on comments.
    useEffect(() => {
        getComments({
            filterSortByParams: {
                author,
                sortBy,
                order,
            },
        },
        page,
        )
        .then((userComments) => {
            setComments(userComments.comments);
        })
        .catch((err) => {
            console.log('ERROR: ', err);
        })
    }, [page, order, sortBy, author]);
    return (
        <div>
            <Header />
            <Nav />
            <div
                id='comments-container'
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
                    <SortIcon type={'comments'} variantColour={'#0464FF'}/>
                </div>
                {comments.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <SingleComment
                                comment={comment}
                                variantColour={'#0464FF'}
                                lastComment={comments.lastPage}
                                userComment={true}
                            />
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default UserComments;