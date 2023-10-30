import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getTopics } from '../../utils/api';
import SortIcon from '../Sort/SortIcon';

function Nav({ selectedItem }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsFromAPI) => {
      setTopics(topicsFromAPI);
    });
  }, []);
  return (
    <ul className="nav alabaster-bckgrnd">
      <div style={{
        display: 'flex', width: '70%', overflow: 'hidden', alignItems: 'center',
      }}
      >
        <Link className={selectedItem === null ? 'nav-link small-icon selected-nav-item' : 'nav-link small-icon'} to="/articles">
          <li>All topics</li>
        </Link>
        {
          // eslint-disable-next-line consistent-return
          (() => {
            if (topics.length > 0) {
              return topics.slice(0, 5).map(({ name }) => (
                <Link key={name} className={selectedItem === name ? 'nav-link small-icon selected-nav-item' : 'nav-link small-icon'} to={`/articles?topic=${name}`}>
                  <li>{name}</li>
                </Link>
              ));
            }
          })()
        }
        {
        /**
          * If the user is on a specific article don't show sort icon, as this is irrelevant.
          */
        // eslint-disable-next-line consistent-return
        (() => {
          if (window.location.pathname.split('/').length <= 2 && window.location.pathname.includes('articles')) {
            return <SortIcon type="articles" />;
          }
        })()
        }
        <Link className={selectedItem === 'all topics' ? 'nav-link small-icon selected-nav-item' : 'nav-link small-icon'} to="/topics">
          <li>More topics here</li>
        </Link>
      </div>
    </ul>
  );
}

export default Nav;

Nav.propTypes = {
  selectedItem: PropTypes.string,
};

Nav.defaultProps = {
  selectedItem: null,
};
