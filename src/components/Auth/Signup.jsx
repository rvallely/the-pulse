import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postUser } from '../../utils/api';
import thePulseLogoWhite from '../../assets/icons/the-pulse-logo-white.png';
import AvatarGrid from './AvatarGrid';
import changeModalVisibility from '../../helpers/changeModalVisibility';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatarIcon, setAvatarIcon] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords must match.');
    } else if (username.length > 29) {
      alert('Username must not exceed 30 characters.');
    } else {
      postUser({
        email, username, avatarIcon, password,
      }).then(() => {
        alert('Sign up successful, please log in.');
        navigate('/');
      })
        .catch((err) => {
          if (err.response.data.msg === 'User already exists, please log in.') {
            alert(err.response.data.msg);
            navigate('/');
          }
        });
    }
  };
  return (
    <div className="mischka-bckgrnd page fixed">
      <div className="centre-align-x-y-container">
        <div className="auth-container auth-container-shape-color">
          <div style={{ margin: '7.72%', maxHeight: '90%' }}>
            <div className="inline-container">
              <div className="one-of-two-inline-element">
                <div>
                  <img className="small-auth-icon" src={thePulseLogoWhite} alt="the pulse logo" />
                </div>
              </div>
              <div className="one-of-two-inline-element">
                <Link className="inherit-color" to="/">
                  <p style={{ textAlign: 'right', fontSize: '1.5rem' }}>Back to Login</p>
                </Link>
              </div>
            </div>
            <h2 style={{ marginTop: '0%', marginBottom: '2%' }}>Sign up here:</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-form-input auth-form-input-background"
              />

              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="auth-form-input auth-form-input-background"
              />
              <div className="inline-container">
                <div className="one-of-two-inline-element">
                  <button
                    type="button"
                    className="modal-button auth-form-input auth-form-input-background"
                    onClick={() => changeModalVisibility({
                      modalId: 'avatar-grid-modal',
                    })}
                    style={{
                      fontSize: '1rem',
                      marginBottom: '2%',
                      textIndent: '0px',
                      borderRadius: '5px',
                      border: '1px solid #444',
                    }}
                  >
                    Select Your Avatar
                  </button>
                </div>
                <div className="one-of-two-inline-element">
                  <div>
                    {avatarIcon
                      ? <img alt={avatarIcon} className="small-auth-icon" src={avatarIcon} />
                      : ''}
                  </div>
                </div>
              </div>
              <AvatarGrid
                setAvatarIcon={setAvatarIcon}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-form-input auth-form-input-background"
              />

              <input
                type="password"
                placeholder="Confirm password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-form-input auth-form-input-background"
              />

              <button
                type="submit"
                className="action-btn auth-action-btn primary-bckgrnd white"
                style={{ marginTop: '2%' }}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
