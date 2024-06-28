import { ClientConfig } from 'pg';
import { DataService } from './data.service';
import { DatabaseService } from './database.service';

export abstract class DataServiceFactory {
    static async create(config: ClientConfig): Promise<DataService> {
        const client: DatabaseService = new DatabaseService(config);
        await client.connect();
        return new DataService(client);
    }
}
