import { body } from 'express-validator';
import validate from '../middleware/validator';
import { validatePhone, validateUserName } from '../dao/user.dao';

// 注册
const register = validate([
  //1,验证规则,notEmpty()非空
  body('user.username').custom(async (username) => {
    if (!username) return Promise.reject('用户名不能为空');
    // 在此执行先查询是否
    const data = await validateUserName(username);
    if (data.results) {
      return Promise.reject('用户名已存在');
    }
  }),
  body('user.phone').custom(async (phone) => {
    const regPhone =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!phone) return Promise.reject('手机号不能为空');
    if (!regPhone.test(phone)) return Promise.reject('请填写正确的手机号');
    // 在此执行先查询是否
    const data = await validatePhone(phone);
    if (data.results) {
      return Promise.reject('手机号已存在');
    }
  }),
  body('user.password')
    .notEmpty()
    .withMessage('密码不能为空')
    // 至少包含字母、数字、特殊字符，6-15位
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^\da-zA-Z\s]).{6,15}$/)
    .withMessage('请填写正确的密码格式'),
]);

// 登录
const login = validate([
  body('phone').notEmpty().withMessage('手机号不能为空'),
  body('password').notEmpty().withMessage('密码不能为空'),
  // body('user.password')
  //   .notEmpty()
  //   .withMessage('用户密码不能为空')
  //   .isEmail()
  //   .withMessage('邮箱格式错误'),
]);

export { register, login };
