function changeModalVisibility({ modalId, triggeringElementId }) {
  const modal = document.getElementById(modalId);
  /**
    * comments-container begins open
    * sort-by, avatar-grid modals and delete-content begin closed
    */
  if (
    (modalId === 'comments-container' && modal.style.display === '')
        || modal.style.display === 'block'
  ) {
    modal.style.setProperty('display', 'none');
  } else if (
    ((modalId.includes('sort-by') || modalId.includes('avatar-grid') || modalId.includes('delete-content')) && modal.style.display === '')
        || modal.style.display === 'none'
  ) {
    /**
      * If there is a triggeringElementId, position the modal content just below this element.
      */
    if (triggeringElementId) {
      const triggeringElement = document.getElementById(triggeringElementId);
      const rectangleContainingTriggeringElement = triggeringElement.getBoundingClientRect();

      const modalContent = document.getElementById(`${modalId}-content`);

      modalContent.style.setProperty(
        'top',
        `${rectangleContainingTriggeringElement.top + rectangleContainingTriggeringElement.height + 10}px`,
      );
      modalContent.style.setProperty('left', `${rectangleContainingTriggeringElement.left}px`);
    }

    modal.style.setProperty('display', 'block');
  }
}

export default changeModalVisibility;
