const { REDIS_CONF } = require('./db_config');
const { isPrd } = require('./env_config');

module.exports = {
  qiniu: {
    keys: {
      ak: 'Zt-Retg7CVm3iWgcc7sntPhOop1VXFURSg-eo0p3',
      sk: 'YF1hCCzP4LHA76mUIRdypiYMPHlFL31ZBnOIKp8K'
    },
    bucket: {
      tximg: {
        bucket_name: 'zc-txclass-img',
        domain: 'http://tximg.zcjsstudy.com/'
      }
    }
  },
  crawler: {
    url: {
      main: 'https://msiwei.ke.qq.com/#category=-1&tab=0',
      course: 'https://msiwei.ke.qq.com/#tab=1&category=-1',
      teacher: 'https://msiwei.ke.qq.com/#tab=2&category=-1',
      aboutus: 'https://msiwei.ke.qq.com/#category=-1&tab=3'
    }
  },
  sessionInfo: {
    keys: ['a1fsa6f4sa6f9e'],
    name: 'txclass.sid',
    prefix: 'txclass.sess'
  },
  cookieInfo: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  redisInfo: {
    all: `${REDIS_CONF[1]}:${REDIS_CONF[0]}`
  },
  adminAccount: {
    username: 'admin',
    password: 'admin'
  },
  cryptoSecret: 'DEFJEO#OFJfsg@',
  corsOrigin: isPrd ? 'http://admin.jsplusplus.com' : 'http://localhost:3000'
}