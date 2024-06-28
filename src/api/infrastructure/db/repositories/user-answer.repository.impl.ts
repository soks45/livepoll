import { UserAnswer } from 'api/core/models/user-answer';
import { Client } from 'pg';
import { IUserAnswerRepository } from '../../../core/repositories/user-answer.repository';

export class UserAnswerRepositoryImpl implements IUserAnswerRepository {
    constructor(private readonly databaseService: Client) {}

    create(userId: number, pollId: number, answerId: number): Promise<number> {
        throw new Error('Method not implemented.');
    }
    readByUserIdAndPollId(userId: number, pollId: number): Promise<UserAnswer[]> {
        throw new Error('Method not implemented.');
    }
    readByPollId(pollId: number): Promise<UserAnswer[]> {
        throw new Error('Method not implemented.');
    }
}
