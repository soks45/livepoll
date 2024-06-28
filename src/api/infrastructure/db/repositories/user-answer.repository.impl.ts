import { UserAnswer } from '../../../core/models/user-answer';
import { IUserAnswerRepository } from '../../../core/repositories/user-answer.repository';
import { DatabaseService } from '../database.service';

export class UserAnswerRepositoryImpl implements IUserAnswerRepository {
    constructor(private readonly databaseService: DatabaseService) {}

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
