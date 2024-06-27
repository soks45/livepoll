import express, { Router } from 'express';

const clientRouter: Router = express.Router();
clientRouter.get('/', (req: express.Request, res: express.Response) => {
    res.render('page');
})

export { clientRouter };
