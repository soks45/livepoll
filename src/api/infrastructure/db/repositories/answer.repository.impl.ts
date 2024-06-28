import { Answer } from '../../../core/models/answer';
import { AnswerData } from '../../../core/models/answer.data';
import { QueryResult } from 'pg';
import { IAnswerRepository } from '../../../core/repositories/answer.repository';
import { DatabaseService } from '../database.service';

interface AnswerDTO {
    id: number;
    name: string;
    pollid: number;
}

export class AnswerRepositoryImpl implements IAnswerRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async readAllByPollId(pollId: number): Promise<Answer[]> {
        const result: QueryResult<AnswerDTO> = await this.databaseService.query<AnswerDTO>(
            'SELECT * FROM answer where pollId = $1',
            [pollId]
        );
        return result.rows.map((dto) => new Answer(dto.id, dto.name, dto.pollid));
    }

    async create(pollId: number, answer: AnswerData): Promise<number> {
        const result = await this.databaseService.query(
            'INSERT INTO answer(name, pollId) VALUES($1, $2) RETURNING id',
            [answer.name, pollId]
        );
        return result.rows[0].id;
    }

    async update(id: number, answer: AnswerData): Promise<void> {
        await this.databaseService.query('UPDATE answer SET name = $1 WHERE id = $2', [answer.name, id]);
    }

    async deleteList(idList: number[]): Promise<void> {
        await this.databaseService.query(`DELETE FROM answer WHERE id in (${idList.join(', ')})`);
    }
}
