const newsRouter = require('./news.router');
const siteRouter = require('./site.router');

function route(app) {
    app.use('/news', newsRouter);

    app.use('/', siteRouter);
}

module.exports = route;
