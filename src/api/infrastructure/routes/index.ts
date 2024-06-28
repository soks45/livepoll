import express, { Router } from 'express';
import { Core } from '../../core/core';
import { pollRouter } from './poll.router';
import { userRouter } from './user.router';

export function apiRouter(core: Core): Router {
    return express.Router().use('/user', userRouter(core.userService)).use('/poll', pollRouter(core.pollService));
}
