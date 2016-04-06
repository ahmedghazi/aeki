var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Posts = mongoose.model('Posts'),
    Users = mongoose.model('Users');

module.exports = function (app) {
    app.use('/admin', router);
};

// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (req, res, next) {
if (req.isAuthenticated())
    return next();
    res.redirect('/security/login');
}

router.get('/', isAuthenticated, function (req, res, next) {
    //console.log(req.user)
    res.render('admin/index', {
        title: 'Admin',
        user: req.user
    });
});

/******************
    DATES
*******************/
router.get('/posts', isAuthenticated, function (req, res, next) {
    //console.log(req.user)
    Posts.find(function (err, posts) {
        if (err) return next(err);
        console.log(posts)
        res.render('admin/posts', {
            title: 'Posts',
            posts: posts,
            user: req.user
        });
    });
});

router.get('/post/:id', isAuthenticated, function (req, res, next) {
    Posts.find({'_id': req.params.id}, function(err, post) {
        if (err) {
            console.log(err)
            return done(err);
        }
        console.log(post)
        res.render('admin/chef-edit', {
            title: 'Posts',
            post: post[0],
            user: req.user
        });
        
    });
});

router.get('/posts/new', function (req, res, next) {
    res.render('admin/posts-new', {
        title: 'Ajouter'
    });
});



/******************
    CHEFS
*******************/
router.get('/users', isAuthenticated, function (req, res, next) {
    //console.log(req.user)
    Users.find(function (err, users) {
        if (err) return next(err);
        res.render('admin/users', {
            title: 'Users',
            users: users,
            user: req.user
        });
    });
});

router.get('/user/:id', isAuthenticated, function (req, res, next) {
    Users.find({'_id': req.params.id}, function(err, user) {
        if (err) {
            console.log(err)
            return done(err);
        }
        console.log(user)
        res.render('admin/users-edit', {
            title: 'Users',
            users: user[0],
            user: req.user
        });
        
    });
});

router.get('/users/new', function (req, res, next) {
    res.render('admin/users-new', {
        title: 'Ajouter'
    });
});