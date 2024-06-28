import { Client, ClientConfig } from 'pg';
import { DataService } from './data.service';

export abstract class DataServiceFactory {
    static async create(config: ClientConfig): Promise<DataService> {
        const client = new Client(config);
        await client.connect();
        return new DataService(client);
    }
}
