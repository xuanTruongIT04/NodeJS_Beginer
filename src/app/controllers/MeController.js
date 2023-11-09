const Course = require('../model/Course');
const { multiMongooseToObject } = require('../../util/mongoose');
class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({ deletedAt: null }),
            Course.countDocumentsDeleted(),
        ])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multiMongooseToObject(courses),
                });
                console.log('>>> COUNT DELETE: ', deletedCount);
            })
            .catch(next);
    }

    // [GET] /me/trashed/courses
    trashedCourses(req, res, next) {
        Course.findDeleted()
            .then((courses) => {
                res.render('me/trashed-courses', {
                    courses: multiMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
