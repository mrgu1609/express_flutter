import type { Request, Response, NextFunction } from 'express';

import log4js from '../common/logger/log4js';
const logger = log4js.getLogger('params');

const ip = function (req: Request, res: Response, next: NextFunction) {
  const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
  logger.info(
    `====================${ip}, ${req.originalUrl}====================`,
  );
  req.body = Object.assign({}, req.body, req.query, req.params, {
    ip: ip,
  });
  console.log('body', JSON.stringify(req.body));
  console.log(`====================参数end====================`);
  next();
};

export default ip;
