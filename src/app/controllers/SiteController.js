const Course = require('../model/Course');
const { multiMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // [GET] /
    async index(req, res, next) {
        await Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multiMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
