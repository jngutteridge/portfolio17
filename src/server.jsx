import path from 'path';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import vhost from 'vhost';

process.env.NODE_ENV = 'development';

// initialize the server and configure support for ejs templates
const app = new Express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
console.log(path.join(__dirname, 'web'));
app.use('/', Express.static(path.join(__dirname, 'web')));

// universal routing and rendering
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

                // This is terrible, but can't find any other way
                if (renderProps.components[1]().props.className === 'not-found') {
                    response.status(404);
                }
            } else {
                main = renderToString(<NotFoundPage/>);
                response.status(404);
            }

            return response.render('index', { main });
        }
    );
});

app.use(vhost('portfolio.dev', app));

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
app.listen(port, error => {
    if (error) {
        return console.error(error);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});
