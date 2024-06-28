import { Answer } from '../models/answer';
import { AnswerStats } from '../models/answer-stats';
import { UserAnswer } from '../models/user-answer';
import { IUserAnswerRepository } from '../repositories/user-answer.repository';
import { AnswerService } from './answer.service';

export class UserAnswerService {
    constructor(
        private readonly answerService: AnswerService,
        private readonly userAnswerRepository: IUserAnswerRepository
    ) {}

    async setAnswer(userId: number, pollId: number, answerId: number): Promise<void> {
        return this.userAnswerRepository.create(userId, pollId, answerId);
    }

    async getUserAnswersInPoll(userId: number, pollId: number): Promise<UserAnswer[]> {
        return this.userAnswerRepository.readByUserIdAndPollId(userId, pollId);
    }

    async getStatsForPoll(pollId: number): Promise<AnswerStats[]> {
        const answers: Answer[] = await this.answerService.getAnswersInPoll(pollId);
        const userAnswers: UserAnswer[] = await this.userAnswerRepository.readByPollId(pollId);
        return answers.map((answer: Answer) => {
            const userAnswersForAnswerCount = userAnswers.filter((ua) => ua.answerId === answer.id).length;
            return new AnswerStats(answer.id, userAnswersForAnswerCount);
        });
    }
}
