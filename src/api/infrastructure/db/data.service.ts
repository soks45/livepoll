import { Client } from 'pg';
import { ICoreDeps } from '../../core/core';
import { IAnswerRepository } from '../../core/repositories/answer.repository';
import { IPollRepository } from '../../core/repositories/poll.repository';
import { IUserAnswerRepository } from '../../core/repositories/user-answer.repository';
import { IUserRepository } from '../../core/repositories/user.repository';
import { AnswerRepositoryImpl } from './repositories/answer.repository.impl';
import { PollRepositoryImpl } from './repositories/poll.repository.impl';
import { UserAnswerRepositoryImpl } from './repositories/user-answer.repository.impl';
import { UserRepositoryImpl } from './repositories/user.repository.impl';

export class DataService implements ICoreDeps {
    public readonly answerRepository: IAnswerRepository;
    public readonly pollRepository: IPollRepository;
    public readonly userRepository: IUserRepository;
    public readonly userAnswerRepository: IUserAnswerRepository;

    constructor(private readonly client: Client) {
        this.answerRepository = new AnswerRepositoryImpl(this.client);
        this.pollRepository = new PollRepositoryImpl(this.client);
        this.userRepository = new UserRepositoryImpl(this.client);
        this.userAnswerRepository = new UserAnswerRepositoryImpl(this.client);
    }
}
