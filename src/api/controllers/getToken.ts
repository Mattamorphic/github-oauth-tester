/**
 * @file getToken endpoint exchanges the code param for a token 
 * @author Mattamorphic
 */

import {Request, Response} from 'express';
import request from 'request';

export function getToken(req: Request, res: Response): void {
  const code = req.params.code;
  if (!code) {
    throw new Error('No code provided in params /token/:code');
  }
  console.log('Exchanging code for access token');
  request.post(
    'https://github.com/login/oauth/access_token',
    {
      json: {
        client_id: req.app.locals.clientID, // eslint-disable-line
        client_secret: req.app.locals.clientSecret, // eslint-disable-line
        code,
      },
    },
    (error, _, body): void => {
      if (error) {
        throw new Error(error);
      }
      console.log('Exchanged successfully');
      res.status(200).send(`${body.access_token}`);
    }
  );
}
