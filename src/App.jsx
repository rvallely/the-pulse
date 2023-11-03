import './App.css';
import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './contexts/User';
import Articles from './components/Articles/Articles';
import Login from './components/Auth/Login';
// import Redirect from './components/General/Redirect';
import Signup from './components/Auth/Signup';
import Topics from './components/Topics/Topics';
import SingleArticle from './components/Articles/SingleArticle';
import User from './components/User/UserArea/UserArea';
import PostPatchArticle from './components/User/UserArea/PostPatchArticle';
import UserComments from './components/Comments/UserComments';
import PatchComment from './components/User/UserArea/PatchComment';
import DeleteArticleOrComment from './components/User/UserArea/DeleteArticleOrComment';

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: 'Log in',
    avatarUrl:
        'https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png',
  });

  const loggedInUserLocalStorage = localStorage.getItem('loggedInUser');
  useEffect(() => {
    if (loggedInUserLocalStorage) {
      setLoggedInUser(JSON.parse(loggedInUserLocalStorage));
    }
  }, [loggedInUserLocalStorage]);

  const value = useMemo(
    () => ({ loggedInUser, setLoggedInUser }),
    [loggedInUser],
  );

  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/articles/:articleId" element={<SingleArticle />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/post-article" element={<PostPatchArticle />} />
          <Route path="/user/comments" element={<UserComments />} />
          <Route path="/user/edit-article" element={<PostPatchArticle />} />
          <Route path="/user/edit-comment" element={<PatchComment />} />
          <Route path="/user/delete-comment" element={<DeleteArticleOrComment />} />
          {/*
          <Route path='*' element={<Redirect />}></Route> */}
        </Routes>
      </UserContext.Provider>

    </BrowserRouter>
  );
}

export default App;
