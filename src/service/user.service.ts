import md5 from 'md5';
import { getUserListDb, getUserInfoDb, registerDb } from '../dao/user.dao';
import { getToken } from '../common/jwt';
import log4js from '../common/logger/log4js';
const logger = log4js.getLogger('user.service');

// 获取用户列表
export const getUserList = async () => {
  const results = await getUserListDb();
  return results;
};

// 获取用户信息
export const getUserInfo = async (phone: string, password: string) => {
  const { results, code, err } = await getUserInfoDb(phone);
  if (code !== 200) {
    logger.error(`err>>>>:getUserInfo service>${err}`);
    return { err, results: '' };
  }
  // // 此处暂时不做验证 不验证密码
  // if (md5(password) !== results?.password) {
  //   return { err: '用户名或密码不正确，请确认后重新登录', results: '' };
  // }

  const payLoad = {
    id: results?.uid,
    username: results?.username,
  };
  const token = getToken(payLoad);

  return { err: '', results: token };
};

// 注册
export const registerService = async (
  username: string,
  phone: number,
  password: string,
) => {
  const { results, err, code } = await registerDb(username, phone, password);
  return { err, results, code };
};
