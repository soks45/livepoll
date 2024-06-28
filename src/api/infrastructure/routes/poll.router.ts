import express, { Router } from 'express';
import { AnswerStats } from '../../core/models/answer-stats';
import { AnswerData } from '../../core/models/answer.data';
import { Poll } from '../../core/models/poll';
import { PollData } from '../../core/models/poll.data';
import { UserAnswer } from '../../core/models/user-answer';
import { PollService } from '../../core/services/poll.service';
import { UserAnswerService } from '../../core/services/user-answer.service';
import { authorized, getUserId } from './midlewares/authorized';

export function pollRouter(pollService: PollService, userAnswerService: UserAnswerService): Router {
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
        .get('/:id', async (req, res) => {
            const id: number = Number(req.params.id);
            const poll: Poll = await pollService.getPoll(id);
            res.status(200).json(poll);
        })
        .get('/for-user/:userId', async (req, res) => {
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
        })
        .put('/:id/answer/:answerId', async (req, res, next) => {
            const userId: number = getUserId(res, next);
            const pollId: number = Number(req.params.id);
            const answerId: number = Number(req.params.answerId);
            await userAnswerService.setAnswer(userId, pollId, answerId);
            res.status(204);
            res.send({});
        })
        .get('/:id/answer/list', async (req, res, next) => {
            const userId: number = getUserId(res, next);
            const pollId: number = Number(req.params.id);
            const userAnswers: UserAnswer[] = await userAnswerService.getUserAnswersInPoll(userId, pollId);
            res.status(200).json(userAnswers);
        })
        .get('/:id/stats', async (req, res) => {
            const pollId: number = Number(req.params.id);
            const stats: AnswerStats[] = await userAnswerService.getStatsForPoll(pollId);
            res.status(200).json(stats);
        });
}
