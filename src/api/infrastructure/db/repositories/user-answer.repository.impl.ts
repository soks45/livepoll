import { QueryResult } from 'pg';
import { UserAnswer } from '../../../core/models/user-answer';
import { IUserAnswerRepository } from '../../../core/repositories/user-answer.repository';
import { DatabaseService } from '../database.service';

interface UserAnswerDTO {
    user_id: number;
    poll_id: number;
    answer_id: number;
}

export class UserAnswerRepositoryImpl implements IUserAnswerRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(userId: number, pollId: number, answerId: number): Promise<void> {
        await this.databaseService.query('INSERT INTO user_answer(user_id, poll_id, answer_id) VALUES($1, $2, $3)', [
            userId,
            pollId,
            answerId,
        ]);
    }

    async readByUserIdAndPollId(userId: number, pollId: number): Promise<UserAnswer[]> {
        const result: QueryResult<UserAnswerDTO> = await this.databaseService.query<UserAnswerDTO>(
            'SELECT * FROM user_answer WHERE user_id = $1 AND poll_id = $2',
            [userId, pollId]
        );
        const dtos: UserAnswerDTO[] = result.rows;
        return dtos.map((dto: UserAnswerDTO) => new UserAnswer(dto.user_id, dto.poll_id, dto.answer_id));
    }

    async readByPollId(pollId: number): Promise<UserAnswer[]> {
        const result: QueryResult<UserAnswerDTO> = await this.databaseService.query<UserAnswerDTO>(
            'SELECT * FROM user_answer WHERE poll_id = $1',
            [pollId]
        );
        const dtos: UserAnswerDTO[] = result.rows;
        return dtos.map((dto: UserAnswerDTO) => new UserAnswer(dto.user_id, dto.poll_id, dto.answer_id));
    }
}
