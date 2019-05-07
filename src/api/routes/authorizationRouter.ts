/**
 * @file Authorization router
 * @author Mattamorphic
 */

import { Router } from 'express';
import { getAuthorization } from '../controllers/getAuthorization';

export const authorizationRouter = Router();

authorizationRouter.get('/', getAuthorization);
