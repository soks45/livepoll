import express, { Express } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import * as process from 'node:process';
import path from 'path';
import { ApiRouter } from './api/routes';
import { clientRouter } from './client/routes';
import { errorHandler } from './midlewares/error.handler';
import { DatabaseService } from './api/services/database.service';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap(): Promise<void> {
    const app: Express = express();

    app.use(logger('dev'))
        .use(express.json())
        .use(express.urlencoded({ extended: false }))
        .use(cookieParser())
        .set('view engine', 'ejs')
        .set('views', path.join(__dirname, 'client', 'views'))
        .use(express.static(path.join(__dirname, 'client', 'public')))
        .use('/', clientRouter)
        .use('/api', ApiRouter)
        .use(errorHandler);

    await DatabaseService.connect();

    const port: number = Number(process.env.SERVER_PORT);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

bootstrap();
