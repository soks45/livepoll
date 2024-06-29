import express, { Router } from 'express';
import Joi from 'joi';
import { AnswerData } from '../../api/core/models/answer.data';
import { PollData } from '../../api/core/models/poll.data';
import { User } from '../../api/core/models/user';
import { PollService } from '../../api/core/services/poll.service';
import { UserService } from '../../api/core/services/user.service';
import { UserHelpers } from '../helpers/user.helper';

export function clientMainRouter(userService: UserService, pollService: PollService): Router {
    return express
        .Router()
        .get('/', async (req, res, next) => {
            const user: User = await userService.getUser(UserHelpers.getUserId(req));
            res.render('main-page', { user });
        })
        .get('/poll', async (req, res, next) => {
            const user: User = await userService.getUser(UserHelpers.getUserId(req));
            res.render('poll-page', { user });
        })
        .post('/poll', async (req, res, next) => {
            const user: User = await userService.getUser(UserHelpers.getUserId(req));
            const name: string = req.body.name;
            const answerNames: string[] = req.body.answer_name;

            const nameSchema: Joi.StringSchema = Joi.string().required();
            const { error } = nameSchema.validate(name);
            if (error) {
                res.status(400).json({ error });
            }
            const answerNamesSchema: Joi.ArraySchema<string> = Joi.array<string>().items(Joi.string().required());
            const answerNamesValidation = answerNamesSchema.validate(answerNames);
            if (answerNamesValidation.error) {
                res.status(400).json({ error: answerNamesValidation.error });
            }

            const pollData: PollData = { name };
            const answersData: AnswerData[] = answerNames.map((name: string): AnswerData => ({ name }));

            try {
                await pollService.createPoll(user.id, pollData, answersData);
                res.redirect(`/main/poll`);
            } catch (e) {
                return res.status(500).json({ e });
            }
        });
}
