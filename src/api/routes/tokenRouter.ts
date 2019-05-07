/**
 * @file Token router
 * @author Mattamorphic
 */

import { Router } from 'express';
import { getToken } from '../controllers/getToken';

export const tokenRouter = Router();

tokenRouter.get('/:code', getToken);
