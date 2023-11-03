import React from 'react';

function Redirect() {
  return (
    <div className="dis-flex-al-ctr" style={{ height: '100vh' }}>
      <div style={{ margin: 'auto' }}>
        <h2 className="title">404: Not Found</h2>
        <h3 className="statement-font-size">Whoops, looks like this page doesn&apos;t exist (yet) &#128579;</h3>
        <div style={{ textAlign: 'left', margin: 'auto', width: 'fit-content' }}>
          <p className="statement-font-size">
            <br />
            Please:
            <br />
            * check the url you entered is correct
            <br />
            * refresh the page
            <br />
            * go back to the
            {' '}
            <a style={{ textDecoration: 'underline', color: 'inherit' }} href="/articles">home page</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Redirect;
