import express, { Router } from 'express';
import Joi from 'joi';
import { Answer } from '../../core/models/answer';
import { AnswerData } from '../../core/models/answer.data';
import { AnswerService } from '../../core/services/answer.service';
import { authorized } from './midlewares/authorized';

export function answerRouter(answerService: AnswerService): Router {
    return express
        .Router()
        .use(authorized)
        .post('/:pollId', async (req, res, next) => {
            const pollId: number = Number(req.params.pollId);
            const answerData: AnswerData = req.body;

            const pollIdSchema: Joi.NumberSchema = Joi.number().integer().positive().required();
            const { error } = pollIdSchema.validate(pollId);
            if (error) {
                res.status(400).json({ error });
            }
            const answerDataSchema = Joi.object<AnswerData>({
                name: Joi.string().required(),
            });
            const validation = answerDataSchema.validate(answerData);
            if (validation.error) {
                res.status(400).json({ error: validation.error });
            }

            try {
                const id: number = await answerService.createAnswer(pollId, answerData);
                res.status(201).json({ id });
            } catch (err) {
                next(err);
            }
        })
        .patch('/:id', async (req, res, next) => {
            const id: number = Number(req.params.id);
            const answerData: AnswerData = req.body;

            const idSchema: Joi.NumberSchema = Joi.number().integer().positive().required();
            const { error } = idSchema.validate(id);
            if (error) {
                res.status(400).json({ error });
            }
            const answerDataSchema = Joi.object<AnswerData>({
                name: Joi.string().required(),
            });
            const validation = answerDataSchema.validate(answerData);
            if (validation.error) {
                res.status(400).json({ error: validation.error });
            }

            try {
                await answerService.updateAnswer(id, answerData);
                res.status(204).json({});
            } catch (err) {
                next(err);
            }
        })
        .get('/poll/:pollId', async (req, res, next) => {
            const pollId: number = Number(req.params.pollId);

            const pollIdSchema: Joi.NumberSchema = Joi.number().integer().positive().required();
            const { error } = pollIdSchema.validate(pollId);
            if (error) {
                res.status(400).json({ error });
            }

            try {
                const answers: Answer[] = await answerService.getAnswersInPoll(pollId);
                res.status(200).json(answers);
            } catch (err) {
                next(err);
            }
        })
        .delete('/list', async (req, res, next) => {
            const ids: number[] = req.body;

            const idsSchema: Joi.ArraySchema = Joi.array().items(Joi.number().integer().positive());
            const { error } = idsSchema.validate(ids);
            if (error) {
                res.status(400).json({ error });
            }

            try {
                await answerService.deleteAnswers(ids);
                res.status(204).json({});
            } catch (err) {
                next(err);
            }
        });
}
