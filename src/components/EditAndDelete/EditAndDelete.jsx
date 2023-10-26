import editBlack from '../../assets/icons/editBlack.png';
import deleteBlack from '../../assets/icons/deleteBlack.png';

function EditAndDelete() {
    return (
        <div >
        <img
            className='rounded-border-on-hover'
            src={editBlack} style={{ height: '50px', padding: '10px'}}
            alt='edit icon'
            //TODO: onclick go into edit article mode
        >
        </img>
        <img
            className='rounded-border-on-hover'
            src={deleteBlack} style={{ height: '50px', padding: '10px'}}
            alt='delete icon'
            //TODO: onclick go into delete article mode
        >
        </img>
    </div>
    )
}

export default EditAndDelete;