import express, { Router } from 'express';
import { User } from '../../core/models/user';
import { UserData } from '../../core/models/user.data';
import { UserService } from '../../core/services/user.service';

export function userRouter(userService: UserService): Router {
    return express
        .Router()
        .get('/all', async (req, res, next) => {
            const users: User[] = await userService.getUsers();
            res.status(200).json(users);
        })
        .get('/:id', async (req, res, next) => {
            const id: number = Number(req.params.id);
            const user: User = await userService.getUser(id);
            res.status(200).json(user);
        })
        .post('/', async (req, res, next) => {
            const userData: UserData = req.body as UserData;
            const id: number = await userService.createUser(userData);
            res.status(201).json({ id });
        });
}
