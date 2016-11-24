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
app.get('*', (req, res) => {
    match(
        { routes, location: req.url },
        (error, redirectLocation, renderProps) => {

            if (error) {
                return res.status(500).send(error.message);
            }

            if (redirectLocation) {
                return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }

            let main;

            if (renderProps) {
                main = renderToString(<RouterContext {...renderProps}/>);

                if (Number.isInteger(renderProps.status)) {
                    res.status(renderProps.status)
                }
            } else {
                main = renderToString(<NotFoundPage/>);
                res.status(404);
            }

            return res.render('index', { main });
        }
    );
});

app.use(vhost('portfolio.dev', app));

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
app.listen(port, error => {
    if (error) {
        return console.erroror(error);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});
