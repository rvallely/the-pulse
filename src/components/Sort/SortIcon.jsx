import { changeModalVisibility } from "../../helpers/changeModalVisibility";
import SortBy from "./SortBy";
import sort from '../../assets/icons/sort.png';

function SortIcon({ type, variantColour }) {
    return (
        <div>
            <div
                id={`${type}-sort-by-icon`}
                className={type === 'articles'? 'small-icon nav-link': 'small-icon rounded-border-on-hover'}
                style={{ width: '60px',display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                onClick={() => changeModalVisibility({
                    modalId: `${type}-sort-by-modal`,
                    triggeringElementId: `${type}-sort-by-icon`,
                })}
            >
                <img alt='sort-icon' className='nav-icon' src={sort}></img>
            </div>
            <SortBy
                type={type}
                variantColour={variantColour}
            />
        </div>
 
    )
}

export default SortIcon;