import express from 'express';

export abstract class UserHelpers {
    static getUserId(req: express.Request): number {
        return req.session.userId as number;
    }
}
