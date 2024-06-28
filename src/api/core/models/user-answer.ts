import { UserAnswerData } from './user-answer.data';

export class UserAnswer implements UserAnswerData {
    constructor(
        public readonly id: number,
        public readonly pollId: number,
        public readonly userId: number,
        public readonly answerId: number
    ) {}
}
