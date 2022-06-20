import pool, { RowDataPacket } from '../database/connection';
import { TLoginDao } from '../types/user.type';
import log4js from '../common/logger/log4js';
const logger = log4js.getLogger('user.dao');

// 获取用户列表
export const getUserListDb = async function () {
  try {
    const [results] = await pool.query('SELECT * FROM users');
    return { results, code: 200, err: new Error('') };
  } catch (e) {
    logger.error(`err>>>>:getUserListDb >${e}`);
    return { results: null, code: 500, err: new Error(e as string) };
  }
};

// 获取用户列表
export const getUserInfoDb = async function (
  phone: string,
): Promise<TLoginDao> {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM `users` WHERE `mobile_number` = ?',
      [phone],
    );
    const _results = (results as RowDataPacket)[0];
    return { results: _results, code: 200, err: new Error('') };
  } catch (e) {
    logger.error(`err>>>>:getUserInfoDb >${e}`);
    return { results: null, code: 500, err: new Error(e as string) };
  }
};
// 根据用户名查重
export const validateUserName = async function (
  userName: string,
): Promise<TLoginDao> {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM `users` WHERE `username` = ?',
      [userName],
    );
    const _results = (results as RowDataPacket)[0];
    return { results: _results, code: 200, err: new Error('') };
  } catch (e) {
    logger.error(`err>>>>:validateUserName >${e}`);
    return { results: null, code: 500, err: new Error(e as string) };
  }
};
// 根据手机号查重
export const validatePhone = async function (
  phone: string,
): Promise<TLoginDao> {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM `users` WHERE `mobile_number` = ?',
      [phone],
    );
    const _results = (results as RowDataPacket)[0];
    return { results: _results, code: 200, err: new Error('') };
  } catch (e) {
    logger.error(`err>>>>:validatePhone >${e}`);
    return { results: null, code: 500, err: new Error(e as string) };
  }
};

// 存数据拉
export const registerDb = async function (
  username: string,
  phone: number,
  password: string,
) {
  try {
    const [results] = await pool.execute(
      'INSERT INTO users (`username`, `password`, `mobile_number`) values (?,?,?)',
      [username, password, 13522899276],
    );
    const _results = (results as RowDataPacket)[0];
    return { results: _results, code: 200 };
  } catch (e) {
    logger.error(`err>>>>:registerDb >${e}`);
    return { results: null, code: 500, err: e };
  }
};
