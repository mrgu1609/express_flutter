import { Response } from 'express';

const response = function (res: Response, data: any, msg: string, code = 200) {
  return res.status(code).json({ data, msg, code });
};

export default response;
