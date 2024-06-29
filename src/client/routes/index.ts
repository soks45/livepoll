import express, { Router } from 'express';
import { Core } from '../../api/core/core';
import { checkAuthGuard } from '../middlewares/check-auth.guard';
import { rootGuard } from '../middlewares/root.guard';
import { clientAuthRouter } from './auth.router';
import { clientMainRouter } from './main.router';

export function clientRouter(core: Core): Router {
    return express
        .Router()
        .get('/', rootGuard)
        .use('/auth', clientAuthRouter(core.userService))
        .use('/main', checkAuthGuard, clientMainRouter(core.userService, core.pollService));
}
