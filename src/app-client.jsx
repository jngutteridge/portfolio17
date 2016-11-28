import './scss/style.scss';

import 'script!jquery'
import 'script!what-input'
import 'script!foundation-sites'

import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

window.onload = () => {
    ReactDOM.render(
        <AppRoutes/>, document.getElementById('main')
    );
};
