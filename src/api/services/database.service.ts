import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class DatabaseService extends Client {
    constructor() {
        super({
            user: process.env.DATABASE_USER,
            database: process.env.DATABASE_NAME,
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            password: process.env.DATABASE_PASSWORD,
            application_name: 'livepoll'
        })
    }
}

const instance = new DatabaseService();

export { instance as DatabaseService };
