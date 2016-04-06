var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Posts = mongoose.model('Posts');

module.exports = function (app) {
    app.use('/posts', router);
};

router.get('/', function (req, res, next) {
    Posts.find(function (err, posts) {
        if (err) return next(err);
        res.render('index', {
            title: 'Posts',
            posts: posts
        });
    });
});


router.get('/:id', function (req, res, next) {
    Posts.find({'_id': req.params.id}, function(err, post) {
        if (err) {
            console.log(err)
            return done(err);
        }
        console.log(post)
        res.render('single-post', {
            title: 'Post',
            post: post
        });
        
    });
});
