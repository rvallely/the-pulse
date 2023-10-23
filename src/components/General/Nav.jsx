import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../../utils/api';
import filter from '../../assets/icons/filter.png';

function Nav({ selectedItem }) {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getTopics().then((topicsFromAPI) => {
            setTopics(topicsFromAPI);
        });
    }, []);
    return(
        <ul className='nav alabaster-bckgrnd'>
            <div style={{ display: 'flex', width: '70%', overflow: 'hidden', alignItems: 'center'}}>
                <Link className={selectedItem === null ? 'nav-link selected-nav-item' : 'nav-link'} to='/articles'>
                    <li>All topics</li>
                </Link>
                {topics.slice(0, 5).map(({ name }) => {
                    return (
                        <Link className={selectedItem === name ? 'nav-link selected-nav-item' : 'nav-link'} to={`/articles?topic=${name}`}>
                            <li>{name}</li>
                        </Link>
                    )
                    
                })}
                <div className='nav-link' style={{ width: '10%',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img alt='filter-icon' className='nav-icon' src={filter}></img>
                </div>
                <Link className={selectedItem === 'all topics' ? 'nav-link selected-nav-item' : 'nav-link'} to='/topics'>
                    <li>More topics here</li>
                </Link>
            </div>
        </ul>
    )
}

export default Nav;