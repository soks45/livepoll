import { AnswerData } from './answer.data';

export class Answer implements AnswerData {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly pollId: number
    ) {}
}
