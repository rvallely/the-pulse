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

export const getSingleArticle = async (id) => {
    const data = await newsAPI.get(`/articles/${id}`);
    return data.data.article;
}

export const patchArticle = async ({ id, body }) => {
    const data = await newsAPI.patch(`/articles/${id}`, body);
    return data.data.updatedArticle;
}

export const getComments = async (articleId, sortByParams) => {
    const data = await newsAPI.get(`/articles/${articleId}/comments?sortBy=${sortByParams.sortBy}&order=${sortByParams.order}`);
    return data.data.comments;
}

export const patchComment = async ({ id, body }) => {
    const data = await newsAPI.patch(`/comments/${id}`, body);
    return data.data.updatedComment;
}
