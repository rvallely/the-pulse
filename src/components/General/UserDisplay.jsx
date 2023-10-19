import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';

const UserDisplay = () => {
    const user = useContext(UserContext);
    return (
            <Link className='link' key='user' to='/user' style={{ objectFit: 'contain'}}>
            <div className='header-date'>
                <p className='Date' id='user-username'>{user.loggedInUser.username}</p>
                <img style={{ objectFit: 'contain'}} className='Date' id='user-avatar-icon' src={user.loggedInUser.avatar_url} alt={user.username}></img>
            </div>
        </Link>
    );   
}

export default UserDisplay;

