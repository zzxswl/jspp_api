const seq = require('./connection/mysql_connect');

require('./models');

seq.authenticate().then(() => {
  console.log('MySQL server is connected completely.');
}).catch((error) => {
  console.log('Mysql server is failed to be connected. Error information' + error);
});

seq.sync({
  // force: true
}).then(() => {
  console.log('The table has been synchronised into database successful');
  process.exit();
});