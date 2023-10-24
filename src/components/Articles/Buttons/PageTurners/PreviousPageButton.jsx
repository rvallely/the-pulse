function PreviousPageButton({setPage, page}) {
    return (
<button
                            className='action-btn page-action-btn primary-bckgrnd white'
                            type='button'
                            onClick={() => setPage(page - 1)}>
                                <strong>Previous</strong>
                            </button>
    )
}

export default PreviousPageButton;