const Crawler = require('../libs/crawler');
const { crawler } = require('../config/config');

Crawler({
  url: crawler.url.main,
  callback () {
    const $ = window.$;
    const $item = $('.agency-big-banner-ul .agency-big-banner-li');

    const data = [];

    $item.each((index, item) => {
      const $el = $(item);
      const $elLink = $el.find('.js-banner-btnqq');

      const dataItem = {
        cid: index + 1,
        href: $elLink.prop('href'),
        title: $elLink.prop('title'),
        imgUrl: $elLink.find('img').prop('src'),
        imgKey: ''
      };
      
      data.push(dataItem);
    });
    return data;
  }
});