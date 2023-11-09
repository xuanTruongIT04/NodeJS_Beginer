const Course = require('../model/Course');
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
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

    // [STORE] /courses/store
    store(req, res, next) {
        const dataCreate = { ...req.body };
        dataCreate.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

        const course = new Course(dataCreate);
        course
            .save()
            .then(() => {
                res.redirect('/me/stored/courses');
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

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({
            _id: req.params.id,
        })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({
            _id: req.params.id,
        })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force-delete
    forceDelete(req, res, next) {
        Course.deleteOne({
            _id: req.params.id,
        })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }

    // [POST] /courses/handle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({
                    _id: { $in: req.body.courseIds },
                })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({
                    message: 'Invalid action',
                });
        }
    }
}

module.exports = new CourseController();
