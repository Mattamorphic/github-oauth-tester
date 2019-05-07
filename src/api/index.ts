/**
 * @file API application
 * @author Mattamorphic
 */


// Express JS Config
import express from 'express';
const api = express();
import bodyParser from 'body-parser';
api.use(bodyParser.json());
// Routers
import { authorizationRouter, tokenRouter } from './routes/';

// Add endpoints
api.use('/authorization', authorizationRouter);
api.use('/token', tokenRouter);

export default api;
