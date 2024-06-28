import express, { Router } from 'express';
import { UserData } from '../../core/models/user.data';
import { UserService } from '../../core/services/user.service';

export function userRouter(userService: UserService): Router {
    return express
        .Router()
        .get('all', async (req, res, next) => {
            return await userService.getUsers();
        })
        .get(':id', async (req, res, next) => {
            const id: number = Number(req.params.id);
            return await userService.getUser(id);
        })
        .post('', async (req, res, next) => {
            const userData: UserData = req.body as UserData;
            const id: number = await userService.createUser(userData);
            res.status(201).json({ id });
        });
}
