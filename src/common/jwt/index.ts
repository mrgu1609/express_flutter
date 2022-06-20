import jwt from 'jsonwebtoken';

const secret = 'jwtToken';
const time = '12h';

const getToken = (payload: any) => {
  // payload: {
  //   id:"134567",
  //   name:"zhangsan"
  // }
  return jwt.sign(payload, secret, {
    expiresIn: time, //到期时间7d(7天) 12h  120=120ms 提供三种单位
    issuer: 'flutter', //发行人
  });
};

export { getToken };
