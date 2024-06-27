import express, { Router } from 'express';

const router: Router = express.Router().get('/', (req: express.Request, res: express.Response) => {
    res.render('page.ejs', { context: 123 });
});

export { router as HelloWorldRouter };
