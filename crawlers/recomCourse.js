const Crawler = require('../libs/crawler');
const { crawler } = require('../config/config');

Crawler({
  url: crawler.url.main,
  callback () {
    const $ = window.$;
    const $item = $('.spread-course-ul li');
    const mainTitle = $('.agency-spread-wrap h4').text();  

    const data = [];

    $item.each((index, item) => {
      const $item = $(item);
      const $itemLink = $item.find('a').eq(0); 

      const dataItem = {
        cid: parseInt($item.attr('report-tdw').match(/\&(.+?)\&/)[1].split('=')[1]),
        href: $itemLink.prop('href'),
        mainTitle,
        title: $itemLink.prop('title'),
        posterUrl: $itemLink.find('.spread-course-cover').prop('src').replace('webp', ''),
        description: $item.find('.spread-course-des').text(),
        teacherImg: $item.find('.spread-course-face img').prop('src').replace('webp', ''),
        teacherName: $item.find('.spread-course-face span').eq(0).text(),
        studentCount: parseInt($item.find('.spread-course-face span').eq(1).text().replace(/[^0-9]/gi, '')),
        price: Number($item.find('.spread-course-price').text().trim().slice(1)),
        posterKey: '',
        teacherImgKey: ''
      }

      data.push(dataItem);
    });

    return data;
  }
})