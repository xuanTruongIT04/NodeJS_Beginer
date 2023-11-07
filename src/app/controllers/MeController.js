const Course = require('../model/Course');
const { multiMongooseToObject } = require('../../util/mongoose');
class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('me/stored-courses', {
                    courses: multiMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
