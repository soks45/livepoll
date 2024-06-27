import express, { Router } from 'express';
import { HelloWorldRouter } from './hello-world/hello-world.router';

const clientRouter: Router = express.Router().use('/hello-world', HelloWorldRouter);

export { clientRouter };
