import axios from 'axios';
import REACT_APP_ENV from '../env';

const newsAPI = axios.create({
  baseURL: REACT_APP_ENV === 'dev' ? 'http://localhost:9090/api' : process.ENV.API,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

export const getSingleUser = async (username, password) => {
  const { data: { user } } = await newsAPI.get(`/users?username=${username}&password=${password}`);
  return user;
};

export const postUser = async (user) => {
  const { data: { user: newUser } } = await newsAPI.post('/users', user);
  return newUser;
};

export const getTopics = async () => {
  const { data: { topics } } = await newsAPI.get('/topics');
  return topics;
};

export const getArticles = async (filterAndOrderParams, page) => {
  let path = `/articles?page=${page}`;

  Object.entries(filterAndOrderParams).forEach(([key, value]) => {
    if (value) {
      path += `&${key}=${value}`;
    }
  });

  const { data } = await newsAPI.get(path);
  return data;
};

export const patchArticle = async ({ id, body }) => {
  const { data: { article } } = await newsAPI.patch(`/articles/${id}`, body);
  return article;
};

export const getComments = async ({ articleId, filterSortByParams }, page) => {
  let path = '';
  if (articleId) {
    path = `/articles/${articleId}/comments?page=${page}`;
  } else {
    path = `/comments?page=${page}`;
  }
  Object.entries(filterSortByParams).forEach(([key, value]) => {
    if (value) {
      path += `&${key}=${value}`;
    }
  });
  const { data: { comments } } = await newsAPI.get(path);
  return comments;
};

export const patchComment = async ({ id, body }) => {
  const { data: { comment } } = await newsAPI.patch(`/comments/${id}`, body);
  return comment;
};

export const postComment = async (articleId, comment) => {
  const { data: { comment: postedComment } } = await newsAPI.post(`/articles/${articleId}/comments`, comment);
  return postedComment;
};

export const postArticle = async (article) => {
  const { data: { article: postedArticle } } = await newsAPI.post('/articles', article);
  return postedArticle;
};

export const deleteArticleAndAssociatedComments = async (id) => {
  const data = await newsAPI.delete(`/articles/delete/${id}`);
  return data;
};

export const deleteComments = async (id) => {
  const data = await newsAPI.delete(`/comments/${id}`);
  return data.data;
};
