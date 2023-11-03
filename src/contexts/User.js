import { createContext } from 'react';
import loggedOutUserIcon from '../assets/avatar_icons/logged_out_user.png';
export const defaultUserContext = {
  username: 'Log in',
  avatarIcon: loggedOutUserIcon,
};

// TODO: make logged in stack and non logged in stack so not as many conditionals.
export const UserContext = createContext(defaultUserContext);
