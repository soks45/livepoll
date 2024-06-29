import express, { Router } from 'express';
import { User } from '../../api/core/models/user';
import { UserService } from '../../api/core/services/user.service';
import { UserHelpers } from '../helpers/user.helper';

export function clientMainRouter(userService: UserService): Router {
    return express
        .Router()
        .get('/', async (req, res, next) => {
            const user: User = await userService.getUser(UserHelpers.getUserId(req));
            res.render('main', { user });
        })
        .get('/polls', async (req, res, next) => {
            const user: User = await userService.getUser(UserHelpers.getUserId(req));
            res.render('main', { user });
        });
}
