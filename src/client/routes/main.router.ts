import express, { Router } from 'express';
import Joi from 'joi';
import { Answer } from '../../api/core/models/answer';
import { AnswerData } from '../../api/core/models/answer.data';
import { Poll } from '../../api/core/models/poll';
import { PollData } from '../../api/core/models/poll.data';
import { User } from '../../api/core/models/user';
import { AnswerService } from '../../api/core/services/answer.service';
import { PollService } from '../../api/core/services/poll.service';
import { UserAnswerService } from '../../api/core/services/user-answer.service';
import { UserService } from '../../api/core/services/user.service';
import { UserHelpers } from '../helpers/user.helper';

interface PollAnswersDTO {
    [key: string]: 'selected';
}

export function clientMainRouter(
    userService: UserService,
    pollService: PollService,
    answerService: AnswerService,
    userAnswerService: UserAnswerService
): Router {
    return express
        .Router()
        .get('/', async (req, res) => {
            const user: User = await userService.getUser(UserHelpers.getUserId(req));
            res.render('main-page', { user });
        })
        .get('/poll', async (req, res) => {
            const user: User = await userService.getUser(UserHelpers.getUserId(req));
            const userPolls: Poll[] = await pollService.getUserPolls(user.id);

            res.render('poll-page', { user, polls: userPolls });
        })
        .post('/poll', async (req, res) => {
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
        })
        .get('/poll/:id', async (req, res) => {
            const pollId: number = Number(req.params.id);
            const user: User = await userService.getUser(UserHelpers.getUserId(req));

            const schema = Joi.number().integer().positive();
            const { error } = schema.validate(pollId);
            if (error) {
                res.status(400).json({ error });
            }

            try {
                const poll: Poll = await pollService.getPoll(pollId);
                const answers: Answer[] = await answerService.getAnswersInPoll(pollId);
                res.render('poll-pass-page', { user, poll, answers });
            } catch (e) {
                return res.status(500).json({ e });
            }
        })
        .post('/poll/:id/answer', async (req, res) => {
            const pollId: number = Number(req.params.id);
            const user: User = await userService.getUser(UserHelpers.getUserId(req));
            const answers: PollAnswersDTO = req.body;
            const answerIds: number[] = Object.keys(answers).map((answer) => Number(answer));

            const schema = Joi.number().integer().positive();
            const { error } = schema.validate(pollId);
            if (error) {
                res.status(400).json({ error });
            }
            const answerIdsSchema: Joi.ArraySchema<number> = Joi.array<number>().items(
                Joi.number().integer().positive()
            );
            const validation = answerIdsSchema.validate(answerIds);
            if (validation.error) {
                res.status(400).json({ error: validation.error });
            }

            try {
                for (const answerId of answerIds) {
                    await userAnswerService.setAnswer(user.id, pollId, answerId);
                }
                res.redirect('/main/poll');
            } catch (e) {
                return res.status(500).json({ e });
            }
        });
}
