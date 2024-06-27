import express, { Router } from 'express';

const router: Router = express.Router().get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

export { router as HelloWorldRouter };
