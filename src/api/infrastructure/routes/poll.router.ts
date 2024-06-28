import express, { Router } from 'express';
import { PollService } from '../../core/services/poll.service';
import { authorized } from './midlewares/authorized';

export function pollRouter(pollService: PollService): Router {
    return express
        .Router()
        .use(authorized)
        .get('/', (req, res, next) => {});
}
