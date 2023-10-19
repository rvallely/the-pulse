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

export const postUser = (user) => {
    return newsAPI.post('/users', user).then((data) => {
        return data.data.postedUser;
    });
}

export const getTopics = () => {
    return newsAPI.get('/topics').then((data) => {
        return data.data.topics;
    });
}