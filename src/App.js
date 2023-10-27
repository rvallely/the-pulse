import './App.css';
import { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { UserContext } from './contexts/User';
import Articles from './components/Articles/Articles';
import Login from './components/Auth/Login';
// import Redirect from './components/General/Redirect';
import Signup from './components/Auth/Signup';
import Topics from './components/Topics/Topics';
import SingleArticle from './components/Articles/SingleArticle';
import User from './components/User/UserArea/UserArea';
import PostArticle from './components/User/UserArea/PostArticle';
import UserComments from './components/Comments/UserComments';

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
      username: 'Log in',
      avatar_url:
        'https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png'
  });

  useEffect(() => {
    const loggedInUserLocalStorage = localStorage.getItem('loggedInUser');

    if (loggedInUserLocalStorage !== 'undefined') {
      setLoggedInUser(JSON.parse(loggedInUserLocalStorage));
    }
  }, []);

  const value = useMemo(
    () => ({ loggedInUser, setLoggedInUser }), 
    [loggedInUser]
  );

  return (
    <BrowserRouter>
        <UserContext.Provider value={value}>
        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
                <Route path='/articles' element={<Articles />}></Route>
                <Route path='/topics' element={<Topics />}></Route>
                <Route path='/articles/:articleId' element={<SingleArticle />}></Route>
                <Route path='/user' element={<User />}></Route>
                <Route path='/user/post-article' element={<PostArticle />}></Route>
                <Route path='/user/comments' element={<UserComments />}></Route>
          {/* 
          <Route path='*' element={<Redirect />}></Route> */}
          </Routes>
        </UserContext.Provider>
        
    </BrowserRouter>
  );
}

export default App;
