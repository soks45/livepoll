import { User } from '../models/user';
import { UserData } from '../models/user.data';
import { IUserRepository } from '../repositories/user.repository';

export class UserService {
    constructor(private readonly userRepository: IUserRepository) {}

    async getUser(id: number): Promise<User> {
        return this.userRepository.readById(id);
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.readAll();
    }

    async createUser(user: UserData): Promise<number> {
        return this.userRepository.create(user);
    }
}
