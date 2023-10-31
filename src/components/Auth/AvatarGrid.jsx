import React from 'react';
import PropTypes from 'prop-types';
import beardedMan from '../../assets/avatar_icons/bearded_man.png';
import blondeWoman from '../../assets/avatar_icons/blonde_woman.png';
import darkHairBoy from '../../assets/avatar_icons/dark_hair_boy.png';
import glassesWoman from '../../assets/avatar_icons/glasses_woman.png';
import hacker from '../../assets/avatar_icons/hacker.png';
import hairUpWoman from '../../assets/avatar_icons/hair_up_woman.png';
import hijabWoman from '../../assets/avatar_icons/hijab-woman.png';
import longHairWoman from '../../assets/avatar_icons/long_hair_woman.png';
import redHairWoman from '../../assets/avatar_icons/red_hair_woman.png';
import seriousMan from '../../assets/avatar_icons/serious_man.png';
import smileyMan from '../../assets/avatar_icons/smiley_man.png';
import spiderman from '../../assets/avatar_icons/spiderman.png';
import changeModalVisibility from '../../helpers/changeModalVisibility';

const avatarIcons = [
  ['beardedMan', beardedMan],
  ['blondeWoman', blondeWoman],
  ['darkHairBoy', darkHairBoy],
  ['glassesWoman', glassesWoman],
  ['hacker', hacker],
  ['hairUpWoman', hairUpWoman],
  ['hijabWoman', hijabWoman],
  ['longHairWoman', longHairWoman],
  ['redHairWoman', redHairWoman],
  ['seriousMan', seriousMan],
  ['smileyMan', smileyMan],
  ['spiderman', spiderman],
];

function AvatarGrid({ setAvatarIcon }) {
  return (
    <div
      id="avatar-grid-modal"
      className="modal"
    >
      <div
        className="modal-content auth-container-shape-color"
        style={{
          backgroundColor: '#32323b',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="avatar-container">
          <div className="row">
            {[0, 4, 8].map((column) => (
              <div key={column} className="column">
                {avatarIcons.slice(column, column + 4).map(([name, png]) => (
                  <div
                    key={`avatar-icon-${png}`}
                    role="button"
                    tabIndex="0"
                    onClick={() => {
                      document.getElementById(png).style.setProperty('border', 'solid green');
                      document.getElementById(png).style.setProperty('border-radius', '5px');
                      avatarIcons.forEach(([, value]) => {
                        if (value !== png) {
                          document.getElementById(value).style.setProperty('border', 'none');
                        }
                      });
                      setAvatarIcon(png);
                    }}
                    onKeyDown={() => {
                      document.getElementById(png).style.setProperty('border', 'solid green');
                      document.getElementById(png).style.setProperty('border-radius', '5px');
                      avatarIcons.forEach(([, value]) => {
                        if (value !== png) {
                          document.getElementById(value).style.setProperty('border', 'none');
                        }
                      });
                      setAvatarIcon(png);
                    }}
                  >
                    <img
                      key={png}
                      id={png}
                      alt={name}
                      src={png}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="button"
            className="modal-button auth-form-input auth-form-input-background"
            style={{
              position: 'relative',
              width: '150px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              textIndent: '0px',
              borderRadius: '5px',
              border: '1px solid #444',
              margin: '0',
            }}
            onClick={() => changeModalVisibility({
              modalId: 'avatar-grid-modal',
            })}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvatarGrid;

AvatarGrid.propTypes = {
  setAvatarIcon: PropTypes.func.isRequired,
};
