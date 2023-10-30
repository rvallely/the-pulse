import React from 'react';
import PropTypes from 'prop-types';
import changeModalVisibility from '../../helpers/changeModalVisibility';
import SortBy from './SortBy';
import sort from '../../assets/icons/sort.png';
import colors from '../../utils/variantColours';

function SortIcon({ type, variantColour }) {
  return (
    <div
      className="small-icon rounded-border-on-hover"
    >
      <div
        id={`${type}-sort-by-icon`}
        role="button"
        tabIndex="0"
        style={{
          width: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        onClick={() => changeModalVisibility({
          modalId: `${type}-sort-by-modal`,
          triggeringElementId: `${type}-sort-by-icon`,
        })}
        onKeyDown={() => changeModalVisibility({
          modalId: `${type}-sort-by-modal`,
          triggeringElementId: `${type}-sort-by-icon`,
        })}
      >
        <img alt="sort-icon" className="nav-icon" src={sort} />
      </div>
      <SortBy
        type={type}
        variantColour={variantColour}
      />
    </div>

  );
}

export default SortIcon;

SortIcon.propTypes = {
  type: PropTypes.oneOf(['articles', 'comments']).isRequired,
  variantColour: PropTypes.oneOf(colors),
};

SortIcon.defaultProps = {
  variantColour: '#0464FF',
};
