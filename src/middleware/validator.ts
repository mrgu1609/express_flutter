import { Request, Response } from 'express';
import response from '../common/response';
/*
	验证规则中间件
*/
import { validationResult } from 'express-validator';

// parallel processing 并行处理，除此之外还有顺序处理
const validate = (validations: any[]) => {
  return async (req: Request, res: Response, next: any) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    response(res, '', errors.array()[0].msg, 400);
  };
};

export default validate;
