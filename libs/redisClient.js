const red = require('../db/connection/redis_connect');

async function redisSet (key, value, timeout = 60 * 60) {
  if (typeof(value) === 'object') {
    value = JSON.stringify(value);
  }

  await red.connect();

  await red.set(key, value);
  await red.expire(key, timeout);
}

async function redisGet (key) {
  return new Promise(async (resolve, reject) => {
    await red.connect();
    await red.get(key, (error, value) => {
      if (error) {
        reject(error);
        return;
      }

      if (value == null) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(value));
      } catch (error) {
        resolve(value);
      }
    });
  })
}

module.exports = {
  redisSet,
  redisGet
};