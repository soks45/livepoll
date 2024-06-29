import express, { Router } from 'express';
import Joi from 'joi';
import { UserData } from '../../api/core/models/user.data';
import { UserService } from '../../api/core/services/user.service';

export function clientAuthRouter(userService: UserService): Router {
    return express
        .Router()
        .get('/', (req, res, next) => {
            res.render('auth-page');
        })
        .post('/', async (req, res, next) => {
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
                req.session.userId = id;
                res.redirect('/main');
            } catch (e) {
                return res.status(500).json({ e });
            }
        });
}
