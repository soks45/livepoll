import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { UserService } from '../../../core/services/user.service';

export function authorized(userService: UserService): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
        next();
    };
}

export function getUserId(res: Response, next: NextFunction): number {
    const userId = res.locals.userId;
    if (!userId) {
        next(createHttpError({ status: 401, statusText: 'Not authorized' }));
    }

    return userId;
}
