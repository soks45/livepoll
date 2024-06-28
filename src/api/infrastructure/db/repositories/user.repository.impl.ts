import { QueryResult } from 'pg';
import { User } from '../../../core/models/user';
import { UserData } from '../../../core/models/user.data';
import { IUserRepository } from '../../../core/repositories/user.repository';
import { DatabaseService } from '../database.service';

interface UserDTO {
    id: number;
    name: string;
}

export class UserRepositoryImpl implements IUserRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async readAll(): Promise<User[]> {
        const result: QueryResult<UserDTO> = await this.databaseService.query<UserDTO>('SELECT * FROM user_data');
        return result.rows.map((dto) => new User(dto.id, dto.name));
    }

    async readById(id: number): Promise<User> {
        const result: QueryResult<UserDTO> = await this.databaseService.query<UserDTO>(
            'SELECT * FROM user_data WHERE id = $1',
            [id]
        );
        const dto: UserDTO = result.rows[0];
        return new User(dto.id, dto.name);
    }

    async create(user: UserData): Promise<number> {
        const result = await this.databaseService.query('INSERT INTO user_data(name) VALUES($1) RETURNING id', [
            user.name,
        ]);
        return result.rows[0].id;
    }
}
