import { UserAnswer } from '../models/user-answer';

export interface IUserAnswerRepository {
    create(userId: number, pollId: number, answerId: number): Promise<number>;
    readByUserIdAndPollId(userId: number, pollId: number): Promise<UserAnswer[]>;
    readByPollId(pollId: number): Promise<UserAnswer[]>;
}
