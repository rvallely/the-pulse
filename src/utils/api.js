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

export const getArticles = (filterAndOrderParams, page) => {
    let path = `/articles?page=${page}`;
    Object.entries(filterAndOrderParams).forEach(([key, value]) => {
        if (value) {
            path += `&${key}=${value}`;
        }
    })
    return newsAPI.get(path).then((data) => {
        console.log(data.data)
        return data.data;
    });
}