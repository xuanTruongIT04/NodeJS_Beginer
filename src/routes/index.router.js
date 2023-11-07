const newsRouter = require('./news.router');
const siteRouter = require('./site.router');
const courseRouter = require('./course.router');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', courseRouter);

    app.use('/', siteRouter);
}

module.exports = route;
