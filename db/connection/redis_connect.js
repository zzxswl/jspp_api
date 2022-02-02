const redis = require('redis');
const { REDIS_CONF } = require('../../config/db_config');

const red = redis.createClient(REDIS_CONF);

red.on('error', (error) => {
  console.log('Redis error: ' + error);
});

module.exports = red;