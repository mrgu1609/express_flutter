import type { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import response from '../common/response';

const secret = 'jwtToken';

const midJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'] as string;
  if (!token) {
    return response(res, '', 'Access denied. No token provided', 401);
  }
  try {
    const data = jwt.verify(token, secret);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req['userInfo'] = data;
    next();
  } catch (error) {
    response(res, '', 'Invalid token', 400);
  }
};

export default midJwt;
