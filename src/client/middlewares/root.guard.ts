import express from 'express';

export function rootGuard(req: express.Request, res: express.Response): void {
    if (req.session.userId) {
        res.redirect('/main');
    } else {
        res.redirect('/auth');
    }
}
