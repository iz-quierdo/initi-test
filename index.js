const needle = require('needle');
const cheerio = require('cheerio');
const { Parser } = require('json2csv');

const fields = ['title', 'date'];
const opts = { fields };
const transformOpts = {
  encoding: 'utf-8',
  delimeter: ';',
};

const URL = 'https://lenta.ru/rubrics/ussr/';
const result = [];

needle.get(URL, function (err, res) {
  if (err) throw err;
  const $ = cheerio.load(res.body);

  $('.card-mini__text').each(function () {
    result.push({
      title: $(this).find('.card-mini__title').text(),
      date: $(this).find('.card-mini__date').text(),
    });
  });

  try {
    const parser = new Parser(opts, transformOpts);
    const csv = parser.parse(result);
    console.log(csv);
  } catch (err) {
    console.log(err);
  }
});
