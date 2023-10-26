import { createContext } from 'react';

export const defaultUserContext = {
  username: 'Log in',
  avatar_url:
    'https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png'
};

export const UserContext = createContext(defaultUserContext);

