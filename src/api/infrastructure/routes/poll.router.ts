import express, { Router } from 'express';
import { AnswerData } from '../../core/models/answer.data';
import { Poll } from '../../core/models/poll';
import { PollData } from '../../core/models/poll.data';
import { PollService } from '../../core/services/poll.service';
import { authorized, getUserId } from './midlewares/authorized';

export function pollRouter(pollService: PollService): Router {
    return express
        .Router()
        .use(authorized)
        .post('/', async (req, res, next) => {
            const userId: number = getUserId(res, next);
            const pollData: PollData = req.body.poll;
            const answers: AnswerData[] = req.body.answers;
            const id: number = await pollService.createPoll(userId, pollData, answers);
            res.status(201).json({ id });
        })
        .get('/:id', async (req, res, next) => {
            const id: number = Number(req.params.id);
            const poll: Poll = await pollService.getPoll(id);
            res.status(200).json(poll);
        })
        .get('/for-user/:userId', async (req, res, next) => {
            const userId: number = Number(req.params.userId);
            const polls: Poll[] = await pollService.getUserPolls(userId);
            res.status(200).json(polls);
        })
        .patch('/:id/answers', async (req, res, next) => {
            const userId: number = getUserId(res, next);
            const pollId: number = Number(req.params.id);
            const answersToStayInPoll: number[] = req.body.stay;
            const answersToAdd: AnswerData[] = req.body.add;
            await pollService.updatePollAnswers(userId, pollId, answersToStayInPoll, answersToAdd);
            res.status(204);
            res.send({});
        })
        .patch('/:id', async (req, res, next) => {
            const userId: number = getUserId(res, next);
            const pollId: number = Number(req.params.id);
            const pollData: PollData = req.body;
            await pollService.updatePollData(userId, pollId, pollData);
            res.status(204);
            res.send({});
        });
}
