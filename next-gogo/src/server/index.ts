import * as express from 'express'
import * as next from 'next'
import log from '../core/log'

process.on('uncaughtException', error => {
    log('uncaughtException', error.message, error.stack);
});

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express();

        server.get('/a', (req, res) => {
            return app.render(req, res, '/b', req.query)
        })

        server.get('/b', (req, res) => {
            return app.render(req, res, '/a', req.query)
        })

        server.get('/posts/:id', (req, res) => {
            return app.render(req, res, '/posts', {id: req.params.id})
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            log(`> Ready on http://localhost:${port}`);
        })

    })
