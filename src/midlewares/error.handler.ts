import { Request, Response } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (err: HttpError, req: Request, res: Response): void => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error', { error: err.message, status: err.status });
};
