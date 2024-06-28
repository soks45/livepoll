import { Poll } from 'api/core/models/poll';
import { PollData } from 'api/core/models/poll.data';
import { Client } from 'pg';
import { IPollRepository } from '../../../core/repositories/poll.repository';

export class PollRepositoryImpl implements IPollRepository {
    constructor(private readonly databaseService: Client) {}

    readById(id: number): Promise<Poll> {
        throw new Error('Method not implemented.');
    }
    readByUserId(userId: number): Promise<Poll[]> {
        throw new Error('Method not implemented.');
    }
    create(userId: number, data: PollData): Promise<number> {
        throw new Error('Method not implemented.');
    }
    update(id: number, data: PollData): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
