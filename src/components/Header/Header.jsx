import React, { useContext } from 'react';
import pulseLogoBlack from '../../assets/icons/the-pulse-logo-black.png';
import { UserContext } from '../../contexts/User';
import date from '../../utils/date';

function Header() {
  const { loggedInUser: { username, avatarIcon } } = useContext(UserContext);

  return (
    <ul className="nav mischka-bckgrnd" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{
        display: 'flex', alignItems: 'center', width: '50%', overflow: 'hidden',
      }}
      >
        <div style={{ width: '15%', marginLeft: '1%', marginRight: '1%' }}>
          <img style={{ width: '100%', margin: '0px' }} alt="filter-icon" className="nav-icon" src={pulseLogoBlack} />
        </div>
        <div style={{ width: '10%', textAlign: 'left' }}>
          <h2>The Pulse</h2>
        </div>
      </div>
      <div id="date-user-link" style={{ display: 'grid', alignItems: 'center', width: '15%' }}>
        <p style={{ margin: '1.5%' }}>{date}</p>
        <a href={username === 'Log in' ? '/' : '/user'} style={{ width: '30%', margin: 'auto' }}><img style={{ width: '100%' }} src={avatarIcon} alt="user icon" /></a>
        <a href={username === 'Log in' ? '/' : '/user'} style={{ margin: 'auto', textDecoration: 'none' }}>
          <p style={{ width: 'fit-content', margin: '1.5%', color: '#000000' }}>{username}</p>
          {' '}
        </a>
      </div>
    </ul>
  );
}

export default Header;
