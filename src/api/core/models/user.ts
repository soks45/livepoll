import { UserData } from './user.data';

export class User implements UserData {
    constructor(
        public readonly id: number,
        public readonly name: string
    ) {}
}
