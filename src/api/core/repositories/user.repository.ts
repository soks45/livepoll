import { User } from '../models/user';
import { UserData } from '../models/user.data';

export interface IUserRepository {
    readAll(): Promise<User[]>;
    readById(id: number): Promise<User>;
    create(user: UserData): Promise<number>;
}
