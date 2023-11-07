const Course = require('../model/Course');
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [STORE] /courses/store
    store(req, res, next) {
        const dataCreate = req.body;
        dataCreate.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

        const course = new Course(dataCreate);
        course
            .save()
            .then(() => {
                res.redirect('/');
            })
            .catch((error) => {});
    }

    // [GET] /courses/:slug
    detail(req, res, next) {
        let slug = req.params.slug ?? '';
        Course.findOne({ slug: slug })
            .then((course) => {
                res.render('courses/detail', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
}

module.exports = new CourseController();
