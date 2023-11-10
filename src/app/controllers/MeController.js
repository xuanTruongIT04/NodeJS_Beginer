const Course = require('../model/Course');
const { multiMongooseToObject } = require('../../util/mongoose');
class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({ deletedAt: null });

        Promise.all([
            Course.find({ deletedAt: null }).sortable(req),
            Course.countDocumentsDeleted(),
        ])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multiMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    // [GET] /me/trashed/courses
    trashedCourses(req, res, next) {
        Promise.all([Course.findDeleted(), Course.countDocuments()])
            .then(([courses, cntCourses]) => {
                res.render('me/trashed-courses', {
                    cntCourses: cntCourses,
                    courses: multiMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
