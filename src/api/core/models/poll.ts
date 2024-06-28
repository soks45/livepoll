import { PollData } from './poll.data';

export class Poll implements PollData {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly creatorId: number
    ) {}
}
