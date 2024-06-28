import { Poll } from '../models/poll';
import { PollData } from '../models/poll.data';

export interface IPollRepository {
    readById(id: number): Promise<Poll>;
    readByUserId(userId: number): Promise<Poll[]>;
    create(userId: number, data: PollData): Promise<number>;
    update(id: number, data: PollData): Promise<void>;
}
