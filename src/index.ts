import express, { Express } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import * as process from 'node:process';
import { setupApi } from './api';
import { DatabaseService } from './api/services/database.service';
import { setupClient } from './client';
import { errorHandler } from './midlewares/error.handler';
import dotenv from 'dotenv';

async function bootstrap(): Promise<void> {
    dotenv.config();
    const app: Express = express();
    app.use(logger('dev'))
        .use(express.json())
        .use(express.urlencoded({ extended: false }))
        .use(cookieParser());
    setupClient(app);
    setupApi(app);
    app.use(errorHandler);

    await DatabaseService.connect();

    const port: number = Number(process.env.SERVER_PORT);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

bootstrap();
