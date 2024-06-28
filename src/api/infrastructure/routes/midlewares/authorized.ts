import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

export async function authorized(req: Request, res: Response, next: NextFunction): Promise<void> {
    // TODO remove mock
    res.locals.userId = 1;
    next();
}

export function getUserId(res: Response, next: NextFunction): number {
    const userId = res.locals.userId;
    if (!userId) {
        next(createHttpError({ status: 401, statusText: 'Not authorized' }));
    }

    return userId;
}
