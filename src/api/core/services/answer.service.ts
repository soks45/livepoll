import { Answer } from '../models/answer';
import { AnswerData } from '../models/answer.data';
import { IAnswerRepository } from '../repositories/answer.repository';

export class AnswerService {
    constructor(private readonly answerRepository: IAnswerRepository) {}

    async createAnswer(pollId: number, answer: AnswerData): Promise<number> {
        return this.answerRepository.create(pollId, answer);
    }

    async updateAnswer(id: number, answer: AnswerData): Promise<void> {
        return this.answerRepository.update(id, answer);
    }

    async getAnswersInPoll(pollId: number): Promise<Answer[]> {
        return this.answerRepository.readAllByPollId(pollId);
    }

    async deleteAnswers(answers: Answer[]): Promise<void> {
        if (answers.length > 0) {
            await this.answerRepository.deleteList(answers.map(({ id }) => id));
        }
    }
}
