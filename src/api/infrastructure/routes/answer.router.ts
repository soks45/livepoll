import express, { Router } from 'express';
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
            const id: number = await answerService.createAnswer(pollId, answerData);
            res.status(201).json({ id });
        })
        .patch('/:id', async (req, res, next) => {
            const id: number = Number(req.params.id);
            const answerData: AnswerData = req.body;
            await answerService.updateAnswer(id, answerData);
            res.status(204).json({});
        })
        .get('/poll/:pollId', async (req, res, next) => {
            const pollId: number = Number(req.params.pollId);
            const answers: Answer[] = await answerService.getAnswersInPoll(pollId);
            res.status(200).json(answers);
        })
        .delete('/list', async (req, res, next) => {
            const ids: number[] = req.body;
            await answerService.deleteAnswers(ids);
            res.status(204).json({});
        });
}
