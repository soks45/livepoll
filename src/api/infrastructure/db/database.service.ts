import { Client, ClientConfig } from 'pg';

export class DatabaseService extends Client {
    constructor(config: ClientConfig) {
        super(config);
    }

    public querySQL<T>(sql: string): Promise<T> {
        return new Promise((resolve, reject) => {
            const callback = (err: Error, rows: unknown) => {
                if (err) {
                    return reject(err);
                }
                const result: T = JSON.parse(JSON.stringify(rows));
                resolve(result);
            };
            this.query(sql, callback);
        });
    }
}
