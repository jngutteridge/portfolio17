import React from 'react';

import Header from './Header';

export default (props) => {
    return (
        <div className="index-page">
            <Header/>
            {props.children}
        </div>
    );
}
