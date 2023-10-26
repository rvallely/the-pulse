import { createContext } from 'react';

export const defaultUserContext = {
  username: 'Log in',
  avatar_url:
    'https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png'
};

// TODO: make logged in stack and non logged in stack so not as many conditionals.
export const UserContext = createContext(defaultUserContext);

