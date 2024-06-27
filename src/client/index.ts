import express from 'express';
import path from 'path';
import { clientRouter } from './routes';

export function setupClient(app: express.Application): void {
    app.set('view engine', 'ejs')
        .set('views', path.join(__dirname, 'views'))
        .use(express.static(path.join(__dirname, 'public')))
        .use('/', clientRouter);
}
