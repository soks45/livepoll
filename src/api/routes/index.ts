import express, { Router } from 'express';
import { HelloWorldRouter } from './hello-world/hello-world.router';

const router: Router = express.Router().use('/hello-world', HelloWorldRouter);

export { router as ApiRouter };
