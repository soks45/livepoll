import express, { Router } from 'express';
import { Core } from '../../core/core';

export function apiRouter(core: Core): Router {
    return express.Router();
}
