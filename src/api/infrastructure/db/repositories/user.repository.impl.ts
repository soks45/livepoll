import { User } from 'api/core/models/user';
import { UserData } from 'api/core/models/user.data';
import { Client } from 'pg';
import { IUserRepository } from '../../../core/repositories/user.repository';

export class UserRepositoryImpl implements IUserRepository {
    constructor(private readonly databaseService: Client) {}

    readAll(): Promise<User[]> {
        throw new Error('Method not implemented.');
    }
    readById(id: number): Promise<User> {
        throw new Error('Method not implemented.');
    }
    create(user: UserData): Promise<number> {
        throw new Error('Method not implemented.');
    }
}
