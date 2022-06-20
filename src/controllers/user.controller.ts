import { Request, Response } from 'express';
import response from '../common/response';

import log4js from '../common/logger/log4js';
const logger = log4js.getLogger('user.controller');

import {
  getUserList,
  getUserInfo,
  registerService,
} from '../service/user.service';

class UserController {
  // 获取用户列表
  public async list(req: Request, res: Response): Promise<void> {
    const { results, code } = await getUserList();
    response(res, results, '', code);
  }

  // 用户登录
  public async login(req: Request, res: Response): Promise<void> {
    const { phone = '', password = '' } = req.query;
    const { results, err } = await getUserInfo(
      phone as string,
      password as string,
    );
    logger.error(`err>>>>:getUserInfo controller>${err}`);
    if (!err) {
      response(res, results, '');
    } else {
      response(res, null, err.toString(), 500);
    }
  }

  // 用户注册
  public async register(req: Request, res: Response): Promise<void> {
    const {
      user: { username = '', phone = 0, password = '' },
    } = req.body;
    const { err, results, code } = await registerService(
      username,
      phone,
      password,
    );
    if (!err) {
      response(res, results, '注册成功');
    } else {
      response(res, '', JSON.stringify(err), code);
    }
  }

  // public async get(req: Request, res: Response): Promise<void> {
  //   try {
  //     const [results] = await pool.query(
  //       'SELECT * FROM tbl_user WHERE id = ?',
  //       [req.params.id],
  //     )
  //     res.json({ data: results })
  //   } catch (error) {
  //     res.status(500).json({ data: error })
  //   }
  // }
  //
  // public async create(req: Request, res: Response): Promise<void> {
  //   try {
  //     const [results] = await pool.query('INSERT INTO tbl_user set ?', [
  //       req.body,
  //     ])
  //     res.json({ data: results })
  //   } catch (error) {
  //     res.status(500).json({ data: error })
  //   }
  // }
  //
  // public async update(req: Request, res: Response): Promise<void> {
  //   try {
  //     const [results] = await pool.query('UPDATE tbl_user set ? WHERE id = ?', [
  //       req.body,
  //       req.params.id,
  //     ])
  //     res.json({ data: results })
  //   } catch (error) {
  //     res.status(500).json({ data: error })
  //   }
  // }
  //
  // public async delete(req: Request, res: Response): Promise<void> {
  //   try {
  //     const [results] = await pool.query('DELETE FROM tbl_user WHERE id = ?', [
  //       req.params.id,
  //     ])
  //     res.json({ data: results })
  //   } catch (error) {
  //     res.status(500).json({ data: error })
  //   }
  // }
}
const ctrl = new UserController();
export default ctrl;
