import { Answer } from '../models/answer';
import { AnswerData } from '../models/answer.data';

export interface IAnswerRepository {
    readAllByPollId(pollId: number): Promise<Answer[]>;
    create(pollId: number, answer: AnswerData): Promise<number>;
    update(id: number, answer: AnswerData): Promise<void>;
    deleteList(idList: number[]): Promise<void>;
}
