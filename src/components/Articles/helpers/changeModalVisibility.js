export const changeModalVisibility = ({ modalId, modalVisibility, setModalVisibility }) => {
    const modal = document.getElementById(modalId);

    if (modalVisibility === 'closed') {
        modal.style.setProperty('display', "block")
        setModalVisibility('open')
    } else {
        modal.style.setProperty('display', "none")
        setModalVisibility('closed')
    }
}