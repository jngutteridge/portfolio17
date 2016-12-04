import path from 'path';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';

process.env.NODE_ENV = 'development';
process.env.BROWSER  = false;

const app = new Express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/', Express.static(path.join(__dirname, '..', 'public')));

app.get('*', (request, response) => {
    match(
        { routes, location: request.url },
        (error, redirectLocation, renderProps) => {

            if (error) {
                return response.status(500).send(error.message);
            }

            if (redirectLocation) {
                return response.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }

            let main;

            if (renderProps) {
                main = renderToString(<RouterContext {...renderProps}/>);

                const lastRoute = renderProps.routes[renderProps.routes.length - 1];

                if (lastRoute.hasOwnProperty('status')) {
                    response.status(lastRoute.status);
                }
            } else {
                main = renderToString(<NotFoundPage/>);
                response.status(404);
            }

            return response.render('index', { main });
        }
    );
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
app.listen(port, error => {
    if (error) {
        return console.error(error);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});
