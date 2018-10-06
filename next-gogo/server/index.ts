import * as express from 'express';
import * as next from 'next';
import log from '../common/log';
import routes from './routes';
import moment from 'moment';

process.on('uncaughtException', error => {
    log('uncaughtException', error.message, error.stack);
});

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = routes.getRequestHandler(app);

app.prepare()
    .then(() => {
        const server = express();
        server.get('/tt', (req, res) => {
          console.log(req.url)
          const time = moment().format('HH')
          res.text(time);
        });
        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(port, (err) => {
            if (err) throw err
            log(`> Ready on http://localhost:${port}`);
        });
    });
