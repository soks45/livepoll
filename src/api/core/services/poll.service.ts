import { Answer } from '../models/answer';
import { AnswerData } from '../models/answer.data';
import { Pagination } from '../models/pagination';
import { PaginationResult } from '../models/pagination-result';
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

    async getUserPollsPaginated(userId: number, pagination: Pagination): Promise<PaginationResult<Poll>> {
        return this.pollRepository.readPageByUserId(userId, pagination.size, pagination.page);
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
        answerIdsToStayInPoll: number[],
        newAnswers: AnswerData[]
    ): Promise<void> {
        await this.checkPollUser(userId, pollId);
        const currentAnswers: Answer[] = await this.answerService.getAnswersInPoll(pollId);
        const answersIdsToRemove: number[] = currentAnswers
            .filter(
                (answer: Answer) => !!answerIdsToStayInPoll.find((answerId: number): boolean => answerId === answer.id)
            )
            .map(({ id }) => id);
        await this.answerService.deleteAnswers(answersIdsToRemove);
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
