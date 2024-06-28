import { Answer } from 'api/core/models/answer';
import { AnswerData } from 'api/core/models/answer.data';
import { Client } from 'pg';
import { IAnswerRepository } from '../../../core/repositories/answer.repository';

export class AnswerRepositoryImpl implements IAnswerRepository {
    constructor(private readonly databaseService: Client) {}

    readAllByPollId(pollId: number): Promise<Answer[]> {
        throw new Error('Method not implemented.');
    }
    create(pollId: number, answer: AnswerData): Promise<number> {
        throw new Error('Method not implemented.');
    }
    update(id: number, answer: AnswerData): Promise<void> {
        throw new Error('Method not implemented.');
    }
    deleteList(idList: number[]): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
