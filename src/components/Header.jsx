import React from 'react';

import Navigation from './Navigation';

export default () => {
    return (
        <header>
            <div className="top-bar">
                <div className="top-bar-left">
                    <Navigation/>
                </div>
            </div>
        </header>
    );
}
