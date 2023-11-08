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

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => {
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne(
            {
                _id: req.params.id,
            },
            req.body,
        )
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.deleteOne({
            _id: req.params.id,
        })
            .then(() => res.redirect('back'))
            .catch(next);
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
