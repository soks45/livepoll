import express, { Router } from 'express';
import Joi from 'joi';
import { AnswerStats } from '../../core/models/answer-stats';
import { AnswerData } from '../../core/models/answer.data';
import { Poll } from '../../core/models/poll';
import { PollData } from '../../core/models/poll.data';
import { UserAnswer } from '../../core/models/user-answer';
import { PollService } from '../../core/services/poll.service';
import { UserAnswerService } from '../../core/services/user-answer.service';
import { UserService } from '../../core/services/user.service';
import { authorized, getUserId } from './midlewares/authorized';

export function pollRouter(
    pollService: PollService,
    userAnswerService: UserAnswerService,
    userService: UserService
): Router {
    return express
        .Router()
        .use(authorized(userService))
        .post('/', async (req, res, next) => {
            const userId: number = getUserId(res, next);
            const pollData: PollData = req.body.poll;
            const answers: AnswerData[] = req.body.answers;

            const userIdSchema: Joi.NumberSchema = Joi.number().integer().positive().required();
            const { error } = userIdSchema.validate(userId);
            if (error) {
                res.status(400).json({ error });
            }
            const pollDataSchema = Joi.object<PollData>({
                name: Joi.string().required(),
            });
            const pollDataValidation = pollDataSchema.validate(pollData);
            if (pollDataValidation.error) {
                res.status(400).json({ error: pollDataValidation.error });
            }
            const answersSchema = Joi.object<AnswerData>({
                name: Joi.string().required(),
            });
            const answersValidation = answersSchema.validate(answers);
            if (answersValidation.error) {
                res.status(400).json({ error: answersValidation.error });
            }

            try {
                const id: number = await pollService.createPoll(userId, pollData, answers);
                res.status(201).json({ id });
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
                const poll: Poll = await pollService.getPoll(id);
                res.status(200).json(poll);
            } catch (err) {
                next(err);
            }
        })
        .get('/for-user/:userId', async (req, res, next) => {
            const userId: number = Number(req.params.userId);

            const schema = Joi.number().integer().positive();
            const { error } = schema.validate(userId);
            if (error) {
                return res.status(400).json({ error });
            }

            try {
                const polls: Poll[] = await pollService.getUserPolls(userId);
                res.status(200).json(polls);
            } catch (err) {
                next(err);
            }
        })
        .patch('/:id/answers', async (req, res, next) => {
            const userId: number = getUserId(res, next);
            const pollId: number = Number(req.params.id);
            const answerIdsToStayInPoll: number[] = req.body.stay;
            const answersToAdd: AnswerData[] = req.body.add;

            const idSchema = Joi.number().integer().positive();
            const userIdValidation = idSchema.validate(userId);
            if (userIdValidation.error) {
                return res.status(400).json({ error: userIdValidation.error });
            }
            const pollIdValidation = idSchema.validate(pollId);
            if (pollIdValidation.error) {
                return res.status(400).json({ error: pollIdValidation.error });
            }
            const idsSchema: Joi.ArraySchema = Joi.array().items(Joi.number().integer().positive());
            const idsValidation = idsSchema.validate(answerIdsToStayInPoll);
            if (idsValidation.error) {
                res.status(400).json({ error: idsValidation.error });
            }
            const answersDataSchema: Joi.ArraySchema<AnswerData> = Joi.array<AnswerData>().items(
                Joi.object<AnswerData>({ name: Joi.string().required() })
            );
            const answersDataValidation = answersDataSchema.validate(answersDataSchema);
            if (answersDataValidation.error) {
                res.status(400).json({ error: answersDataValidation.error });
            }

            try {
                await pollService.updatePollAnswers(userId, pollId, answerIdsToStayInPoll, answersToAdd);
                res.status(204);
                res.send({});
            } catch (err) {
                next(err);
            }
        })
        .patch('/:id', async (req, res, next) => {
            const userId: number = getUserId(res, next);
            const pollId: number = Number(req.params.id);
            const pollData: PollData = req.body;

            const idSchema = Joi.number().integer().positive();
            const userIdValidation = idSchema.validate(userId);
            if (userIdValidation.error) {
                return res.status(400).json({ error: userIdValidation.error });
            }
            const pollIdValidation = idSchema.validate(pollId);
            if (pollIdValidation.error) {
                return res.status(400).json({ error: pollIdValidation.error });
            }
            const pollDataSchema: Joi.ObjectSchema<PollData> = Joi.object<PollData>({ name: Joi.string().required() });
            if (pollDataSchema.error) {
                return res.status(400).json({ error: pollDataSchema.error });
            }

            try {
                await pollService.updatePollData(userId, pollId, pollData);
                res.status(204);
                res.send({});
            } catch (err) {
                next(err);
            }
        })
        .put('/:id/answer/:answerId', async (req, res, next) => {
            const userId: number = getUserId(res, next);
            const pollId: number = Number(req.params.id);
            const answerId: number = Number(req.params.answerId);

            const idSchema = Joi.number().integer().positive();
            const userIdValidation = idSchema.validate(userId);
            if (userIdValidation.error) {
                return res.status(400).json({ error: userIdValidation.error });
            }
            const pollIdValidation = idSchema.validate(pollId);
            if (pollIdValidation.error) {
                return res.status(400).json({ error: pollIdValidation.error });
            }
            const answerIdValidation = idSchema.validate(answerId);
            if (answerIdValidation.error) {
                return res.status(400).json({ error: answerIdValidation.error });
            }

            try {
                await userAnswerService.setAnswer(userId, pollId, answerId);
                res.status(204);
                res.send({});
            } catch (err) {
                next(err);
            }
        })
        .get('/:id/answer/list', async (req, res, next) => {
            const userId: number = getUserId(res, next);
            const pollId: number = Number(req.params.id);

            const idSchema = Joi.number().integer().positive();
            const userIdValidation = idSchema.validate(userId);
            if (userIdValidation.error) {
                return res.status(400).json({ error: userIdValidation.error });
            }
            const pollIdValidation = idSchema.validate(pollId);
            if (pollIdValidation.error) {
                return res.status(400).json({ error: pollIdValidation.error });
            }

            try {
                const userAnswers: UserAnswer[] = await userAnswerService.getUserAnswersInPoll(userId, pollId);
                res.status(200).json(userAnswers);
            } catch (err) {
                next(err);
            }
        })
        .get('/:id/stats', async (req, res, next) => {
            const pollId: number = Number(req.params.id);

            const idSchema = Joi.number().integer().positive();
            const pollIdValidation = idSchema.validate(pollId);
            if (pollIdValidation.error) {
                return res.status(400).json({ error: pollIdValidation.error });
            }

            try {
                const stats: AnswerStats[] = await userAnswerService.getStatsForPoll(pollId);
                res.status(200).json(stats);
            } catch (err) {
                next(err);
            }
        });
}
