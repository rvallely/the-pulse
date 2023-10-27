import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { getSingleUser } from '../../utils/api';
import thePulseLogoWhite from '../../assets/icons/the-pulse-logo-white.png';

function Login () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)
 
   const navigate = useNavigate(); 

   const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        getSingleUser(username, password).then((user) => {
            setLoggedInUser(user);
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            navigate('/articles');
        })
        .catch((err) => {
            console.log('ERROR: ', err);
            if (err.response.data.msg) {
                setError(err.response.data.msg);
            }
            setUsername('');
            setPassword('');
        });
    }
    return (
        <div className='mischka-bckgrnd page fixed'>
            <div className='centre-align-x-y-container'>
                <div className='auth-container auth-container-shape-color'>
                    <div style={{  margin: '7.72%' }}>
                        <div className='inline-container'>
                            <div className='one-of-two-inline-element'>
                                <div>
                                    <img className='small-auth-icon' src={thePulseLogoWhite} alt='the pulse logo'></img>
                                </div>
                            </div>
                            <div className='one-of-two-inline-element'>
                                <Link className='inherit-color' to='/signup'>
                                    <p style={{ textAlign: 'right', fontSize: '1.5rem' }}>Sign up</p>
                                </Link>
                            </div>
                        </div>
                        <h2>Please log in</h2>
                        {error ? <p className='error'>{error}</p>: ''}
                        <form onSubmit={handleSubmit}>
                            <input
                                type='text'
                                placeholder='Username'
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='auth-form-input'
                            ></input>
                            <input
                                type='password'
                                placeholder='Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='auth-form-input'
                            ></input>
                            <button
                            className='action-btn auth-action-btn primary-bckgrnd white'
                            style={{ marginTop: '2%'}}>
                                Log in
                            </button>
                        </form>
                        <h2>or</h2>
                        <Link className='inherit-color' to='/articles'>
                            <h2>Continue as a guest</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;