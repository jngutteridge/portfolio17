import React from 'react'
import { Route, IndexRoute } from 'react-router'
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
    <Route path="/">
        <IndexRoute component={IndexPage}/>
        <Route path="*" status={404} component={NotFoundPage}/>
    </Route>
);

export default routes;
