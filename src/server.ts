import express, { Application, RequestHandler } from 'express';
import cors from 'cors';
import http from 'http';
import config from './config/config';
import db from './config/db';

// UTILITIES
import { corsOptions } from '../src/utils';
//  ERROR HANDLER MIDDLEWARE
import errorHandler from './app/middlewares/errorHandler';
// ROUTERS
import commentRouter from './app/routes/commentRouter';
import movieRouter from './app/routes/movieRouter';

const app: Application = express();
//*  MIDDLEWARES */
app.use(express.urlencoded({ extended: false }) as RequestHandler);
app.use(express.json() as RequestHandler);
app.use(cors(corsOptions));

// ROUTES
const baseRoute = '/api/v1';
app.use(`${baseRoute}/comment`, commentRouter);
app.use(`${baseRoute}/movie`, movieRouter);

app.use(errorHandler);

//* SERVER */
const httpServer = http.createServer(app);

db.then(function (res: any) {
    console.log('Database connected::successfully');
}).catch(function (err: any) {
    console.log('Database error:', err);
});

try {
    httpServer.listen(config.server.port, () => {
        console.info(`Server running on port: ${config.server.port}`);
    });
} catch (err) {
    console.log(err);
}
