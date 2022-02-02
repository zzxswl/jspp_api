const Crawler = require('../libs/crawler');
const { crawler } = require('../config/config');

Crawler({
  url: crawler.url.course,
  callback () {
    const $ = window.$;
    const $item = $('.course-tab-filter li');

    const data = [];

    $item.each((index, item) => {
      const $el = $(item);
      const $itemLk = $el.find('.course-tab-filter-item');
      const title = $itemLk.text().replace(/促/g, '');

      if (title !== '全部') {
        const dataItem = {
          cid: index,
          title
        };
        data.push(dataItem);
      }
    });

    return data;
  }
});