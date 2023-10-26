import axios from 'axios';
import { REACT_APP_ENV } from '../env';

const newsAPI = axios.create({
    baseURL: REACT_APP_ENV === 'dev' ? 'http://localhost:9090/api' : 'https://rosie-nc-news-app.herokuapp.com/api',
    headers: { 'Access-Control-Allow-Origin': '*' }
});

export const getSingleUser = async (username, password) => {
    const response = await newsAPI.post('/users/login', { username, password });
    return response.data.user;
}

export const postUser = async (user) => {
    const data = await newsAPI.post('/users', user);
    return data.data.postedUser;
}

export const getTopics = async () => {
    const data = await newsAPI.get('/topics');
    return data.data.topics;
}

export const getArticles = async (filterAndOrderParams, page) => {
    let path = `/articles?page=${page}`;
    Object.entries(filterAndOrderParams).forEach(([key, value]) => {
        if (value) {
            path += `&${key}=${value}`;
        }
    })
    const data = await newsAPI.get(path);
    return data.data;
}

export const patchArticle = async ({ id, body }) => {
    const data = await newsAPI.patch(`/articles/${id}`, body);
    return data.data.updatedArticle;
}

export const getComments = async ({articleId, filterSortByParams }) => {
    console.log(articleId, filterSortByParams)
    let path = '';
    if (articleId) {
        path = `/articles/${articleId}/comments?page=0`;
    } else {
        path = '/comments?page=0';
    }
    Object.entries(filterSortByParams).forEach(([key, value]) => {
        if (value) {
            path += `&${key}=${value}`;
        }
    })
    const data = await newsAPI.get(path);
    return data.data.comments.comments;
}

export const patchComment = async ({ id, body }) => {
    const data = await newsAPI.patch(`/comments/${id}`, body);
    return data.data.updatedComment;
}

export const postComment = async (articleId, comment) => {
    const data = await newsAPI.post(`/articles/${articleId}/comments`, comment);
    return data.data.comment;
}

export const postArticle = async (article) => {
    const data = await newsAPI.post('/articles', article);
    return data.data.postedArticle;
}