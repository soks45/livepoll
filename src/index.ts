import express, { Express } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import { setupApi } from './api';
import { setupClient } from './client';
import { errorHandler } from './midlewares/error.handler';

const app: Express = express();

app.use(logger('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser());
setupClient(app);
setupApi(app);
app.use(errorHandler);

const port: number = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
