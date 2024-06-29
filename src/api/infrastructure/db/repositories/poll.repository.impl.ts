import { PaginationResult } from '../../../core/models/pagination-result';
import { Poll } from '../../../core/models/poll';
import { PollData } from '../../../core/models/poll.data';
import { QueryResult } from 'pg';
import { IPollRepository } from '../../../core/repositories/poll.repository';
import { DatabaseService } from '../database.service';

interface PollDTO {
    id: number;
    name: string;
    creatorid: number;
}

export class PollRepositoryImpl implements IPollRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async readById(id: number): Promise<Poll> {
        const result: QueryResult<PollDTO> = await this.databaseService.query<PollDTO>(
            'SELECT * FROM poll WHERE id = $1',
            [id]
        );
        const dto: PollDTO = result.rows[0];
        return new Poll(dto.id, dto.name, dto.creatorid);
    }

    async readByUserId(userId: number): Promise<Poll[]> {
        const result: QueryResult<PollDTO> = await this.databaseService.query<PollDTO>(
            'SELECT * FROM poll WHERE creatorId = $1',
            [userId]
        );
        return result.rows.map((dto) => new Poll(dto.id, dto.name, dto.creatorid));
    }

    async readPageByUserId(userId: number, size: number, page: number): Promise<PaginationResult<Poll>> {
        const result: QueryResult<PollDTO> = await this.databaseService.query<PollDTO>(
            'SELECT * FROM poll WHERE creatorId = $1 LIMIT $2 OFFSET $3',
            [userId, size, (page - 1) * size]
        );
        const count = await this.databaseService.query<{ count: number }>(
            'SELECT COUNT(*) FROM poll WHERE creatorId = $1',
            [userId]
        );
        const items: Poll[] = result.rows.map((dto) => new Poll(dto.id, dto.name, dto.creatorid));
        const paginationResult: PaginationResult<Poll> = new PaginationResult<Poll>(
            items,
            page,
            Math.floor(count.rows[0].count / size) || 1
        );
        return paginationResult;
    }

    async create(userId: number, data: PollData): Promise<number> {
        const result = await this.databaseService.query(
            'INSERT INTO poll(name, creatorId) VALUES($1, $2) RETURNING id',
            [data.name, userId]
        );
        return result.rows[0].id;
    }

    async update(id: number, data: PollData): Promise<void> {
        await this.databaseService.query('UPDATE poll SET name = $1 WHERE creatorId = $2', [data.name, id]);
    }
}
