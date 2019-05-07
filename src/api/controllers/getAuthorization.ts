/**
 * @file Get authorization endpoint, callback for app 
 * @author Mattamorphic
 */

import {Request, Response} from 'express';
import request from 'request';

export function getAuthorization(req: Request, res: Response): void {
  const code = req.query.code;
  if (!code) {
    throw new Error('No code provided in query parameter');
  }
  const uri = `${req.app.locals.ngrok.get()}/token/${code}`;
  console.log(`Requesting token from ${uri}`);
  request.get(
    uri,
    null,
    (error, _, token): void => {
      if (error) {
        throw new Error(error);
      }
      console.log(`Access token created: ${token}`)
    }
  )

  res.status(200).send('OK');
}
