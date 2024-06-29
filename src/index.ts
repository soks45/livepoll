import express, { Express } from 'express';
import session from 'express-session';
// eslint-disable-next-line
import sessionExtension from './types/session';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import * as process from 'node:process';
import path from 'path';
import { ClientConfig } from 'pg';
import { Core } from './api/core/core';
import { DataService } from './api/infrastructure/db/data.service';
import { DataServiceFactory } from './api/infrastructure/db/data.service.factory';
import { apiRouter } from './api/infrastructure/routes';
import { clientRouter } from './client/routes';
import dotenv from 'dotenv';

dotenv.config();
const config: ClientConfig = {
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    password: process.env.DATABASE_PASSWORD,
    application_name: 'livepoll',
};

async function bootstrap(): Promise<void> {
    const app: Express = express();
    const databaseServiceInstance: DataService = await DataServiceFactory.create(config);
    const core: Core = new Core(databaseServiceInstance);

    app.use(logger('dev'))
        .use(express.json())
        .use(express.urlencoded({ extended: false }))
        /** cookie */
        .use(cookieParser('COOKIE_SECRET'))
        .use(
            session({
                secret: 'COOKIE_SECRET',
                resave: false,
                saveUninitialized: true,
                cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 дней
            })
        )
        /** SSR */
        .set('view engine', 'ejs')
        .set('views', path.join(__dirname, 'client', 'views'))
        .use(express.static(path.join(__dirname, 'client', 'public')))
        /** Роуты */
        .use('/api', apiRouter(core))
        .use('/', clientRouter(core));

    const port: number = Number(process.env.SERVER_PORT);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

bootstrap().catch((e) => console.error(e));
