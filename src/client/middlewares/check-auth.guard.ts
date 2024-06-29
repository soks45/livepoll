import express from 'express';

export function checkAuthGuard(req: express.Request, res: express.Response, next: express.NextFunction): void {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/auth');
    }
}
