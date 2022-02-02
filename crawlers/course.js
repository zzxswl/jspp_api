const Crawler = require('../libs/crawler');
const { crawler } = require('../config/config');

Crawler({
  url: crawler.url.course,
  callback () {
    const $ = window.$;
    const $item = $('.course-card-list-multi-wrap .course-card-item');

    const data = [];

    $item.each((index, item) => {
      const $el = $(item);
      const $itemLk = $el.find('.item-img-link');

      const dataItem = {
        cid: $itemLk.attr('data-id'),
        href: $itemLk.prop('href'),
        posterUrl: $itemLk.find('.item-img').prop('src').replace('webp', ''),
        courseName: $itemLk.find('.item-img').prop('title'),
        price: $el.find('.item-price').text().replace(/¥/g, ''),
        description: $el.find('.item-status-step').text(),
        studentCount: parseInt($el.find('.item-user').text().trim().replace(/[^0-9]/g, '')),
        posterKey: ''
      }

      data.push(dataItem);
    });

    return data;
  }
});