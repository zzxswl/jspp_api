const pt = require('puppeteer');

module.exports = async function (options) {
  const bs = await pt.launch();
  const pg = await bs.newPage();
  const url = options.url;

  await pg.goto(url, {
    waitUntil: 'networkidle2'
  });


  const result = await pg.evaluate(options.callback);

  await bs.close();

  process.send(result);

  setTimeout(() => {
    process.exit(0);
  }, 1000);
}