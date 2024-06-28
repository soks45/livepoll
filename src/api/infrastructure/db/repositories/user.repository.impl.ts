import { User } from 'api/core/models/user';
import { UserData } from 'api/core/models/user.data';
import { IUserRepository } from '../../../core/repositories/user.repository';
import { DatabaseService } from '../database.service';

export class UserRepositoryImpl implements IUserRepository {
    constructor(private readonly databaseService: DatabaseService) {}

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
