import express, { Router } from 'express';
import Joi from 'joi';
import { User } from '../../core/models/user';
import { UserData } from '../../core/models/user.data';
import { UserService } from '../../core/services/user.service';

export function userRouter(userService: UserService): Router {
    return express
        .Router()
        .get('/all', async (req, res, next) => {
            try {
                const users: User[] = await userService.getUsers();
                res.status(200).json(users);
            } catch (err) {
                next(err);
            }
        })
        .get('/:id', async (req, res, next) => {
            const id: number = Number(req.params.id);

            const schema = Joi.number().integer().positive();
            const { error } = schema.validate(id);
            if (error) {
                return res.status(400).json({ error });
            }

            try {
                const user: User = await userService.getUser(id);
                res.status(200).json(user);
            } catch (e) {
                next(e);
            }
        })
        .post('/', async (req, res) => {
            const userData: UserData = req.body as UserData;

            const schema = Joi.object({
                name: Joi.string().required(),
            });
            const { error } = schema.validate(userData);
            if (error) {
                return res.status(400).json({ error });
            }

            try {
                const id: number = await userService.createUser(userData);
                res.status(201).json({ id });
            } catch (e) {
                return res.status(500).json({ e });
            }
        });
}
