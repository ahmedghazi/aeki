var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Posts = mongoose.model('Posts');

module.exports = function (app) {
    app.use('/', router);
};

router.get('/', function (req, res, next) {
    Posts.find(function (err, posts) {
        if (err) return next(err);
        res.render('index', {
            title: 'Home',
            posts: posts
        });
    });
});
