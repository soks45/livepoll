import express from 'express';
import { ApiRouter } from './routes';

export function setupApi(app: express.Application): void {
    app.use('/api', ApiRouter);
}
