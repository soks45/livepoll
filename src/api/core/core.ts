import { IAnswerRepository } from './repositories/answer.repository';
import { IPollRepository } from './repositories/poll.repository';
import { IUserAnswerRepository } from './repositories/user-answer.repository';
import { IUserRepository } from './repositories/user.repository';
import { AnswerService } from './services/answer.service';
import { PollService } from './services/poll.service';
import { UserAnswerService } from './services/user-answer.service';
import { UserService } from './services/user.service';

export interface ICoreDeps {
    answerRepository: IAnswerRepository;
    pollRepository: IPollRepository;
    userRepository: IUserRepository;
    userAnswerRepository: IUserAnswerRepository;
}

export class Core {
    public readonly answerService: AnswerService;
    public readonly pollService: PollService;
    public readonly userService: UserService;
    public readonly userAnswerService: UserAnswerService;

    constructor({ answerRepository, pollRepository, userRepository, userAnswerRepository }: ICoreDeps) {
        this.answerService = new AnswerService(answerRepository);
        this.pollService = new PollService(this.answerService, pollRepository);
        this.userService = new UserService(userRepository);
        this.userAnswerService = new UserAnswerService(this.answerService, userAnswerRepository);
    }
}
