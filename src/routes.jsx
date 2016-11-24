import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Homepage from './components/Homepage';

const routes = (
    <Route path="/">
        <IndexRoute component={Homepage}/>
    </Route>
);

export default routes;
