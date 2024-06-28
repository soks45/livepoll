import express, { Router } from 'express';
import { Core } from '../../api/core/core';

export function clientRouter(core: Core): Router {
    return express.Router();
}
