import express, { Application, RequestHandler } from 'express';
import cors from 'cors';
import http from 'http';
import config from './config/config';

// UTILITIES
import { corsOptions } from '../src/utils';

//  ERROR HANDLER MIDDLEWARE
import errorHandler from './app/middlewares/errorHandler';

const app: Application = express();

//*  MIDDLEWARES */
app.use(express.urlencoded({ extended: false }) as RequestHandler);
app.use(express.json() as RequestHandler);
app.use(cors(corsOptions));

app.use(errorHandler);

//* SERVER */
const httpServer = http.createServer(app);

try {
    httpServer.listen(config.server.port, () => {
        console.info(`Server running on port: ${config.server.port}`);
    });
} catch (err) {
    console.log(err);
}
