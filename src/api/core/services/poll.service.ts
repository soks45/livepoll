import { Answer } from '../models/answer';
import { AnswerData } from '../models/answer.data';
import { Poll } from '../models/poll';
import { PollData } from '../models/poll.data';
import { IPollRepository } from '../repositories/poll.repository';
import { AnswerService } from './answer.service';

export class PollService {
    constructor(
        private readonly answerService: AnswerService,
        private readonly pollRepository: IPollRepository
    ) {}

    async getPoll(id: number): Promise<Poll> {
        return this.pollRepository.readById(id);
    }

    async getUserPolls(userId: number): Promise<Poll[]> {
        return this.pollRepository.readByUserId(userId);
    }

    async createPoll(userId: number, poll: PollData, answers: AnswerData[]): Promise<number> {
        const pollId: number = await this.pollRepository.create(userId, poll);

        for (const answer of answers) {
            await this.answerService.createAnswer(pollId, answer);
        }

        return pollId;
    }

    async updatePollData(userId: number, pollId: number, pollData: PollData): Promise<void> {
        await this.checkPollUser(userId, pollId);

        return this.pollRepository.update(pollId, pollData);
    }

    async updatePollAnswers(
        userId: number,
        pollId: number,
        answersToStayInPoll: Answer[],
        newAnswers: AnswerData[]
    ): Promise<void> {
        await this.checkPollUser(userId, pollId);

        const currentAnswers: Answer[] = await this.answerService.getAnswersInPoll(pollId);
        const answersToRemove: Answer[] = currentAnswers.filter(
            (answer: Answer) => !!answersToStayInPoll.find((answerTSIP: Answer): boolean => answerTSIP.id === answer.id)
        );
        await this.answerService.deleteAnswers(answersToRemove);
        if (newAnswers.length > 0) {
            for (const answerData of newAnswers) {
                await this.answerService.createAnswer(pollId, answerData);
            }
        }
    }

    private async checkPollUser(userId: number, pollId: number): Promise<void> {
        const poll: Poll = await this.getPoll(pollId);
        if (poll.creatorId !== userId) {
            throw new Error('Нельзя редактировать чужой опрос');
        }
    }
}
