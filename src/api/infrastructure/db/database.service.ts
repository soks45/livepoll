import { ClientConfig, Pool } from 'pg';

export class DatabaseService extends Pool {
    constructor(config: ClientConfig) {
        super(config);
    }
}
