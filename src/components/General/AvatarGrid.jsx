import React from 'react';
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
]
function AvatarGrid({changeModalVisibility, setAvatarIcon, modalVisibility, setModalVisibility}) {
    return ( 
        <div id="avatar-grid-modal" class="modal">
            <div
            className="modal-content auth-container-shape-color"
            style={{ backgroundColor: '#32323b'}}
            >
                <div className="avatar-container">
                <div className="row">
                    {[0, 4, 8].map((column) => {
                        return (
                            <div key={column} className="column">
                                {avatarIcons.slice(column, column + 4 ).map(([name, png]) => {
                                    return <img
                                    id={png}                                 
                                    alt={name}
                                    src={png}
                                    onClick={() => {
                                        document.getElementById(png).style.setProperty('border', 'solid green')
                                        document.getElementById(png).style.setProperty('border-radius', '5px')
                                        avatarIcons.forEach(([key, value]) => {
                                            if (value !== png) {
                                                document.getElementById(value).style.setProperty('border', 'none')
                                            } 
                                        })
                                        setAvatarIcon(png)
                                    }}/>
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
            <p
            className='text-align-centre modal-button'
            style={{ width: '150px', margin: 'auto' }}
            onClick={() => changeModalVisibility(
                {
                    modalId:'avatar-grid-modal',
                    modalVisibility,
                    setModalVisibility,
                }
            )}
            >
                Confirm
            </p>
        </div>
    </div>
  )
}

export default AvatarGrid;
