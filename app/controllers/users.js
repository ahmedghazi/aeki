var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Users = mongoose.model('Users');

module.exports = function (app) {
    app.use('/users', router);
};





router.get('/:id', function (req, res, next) {
    Users.find({'_id': req.params.id}, function(err, user) {
        if (err) {
            console.log(err)
            return done(err);
        }
        console.log(user)
        res.render('single-user', {
            title: 'User',
            user: user[0]
        });
        
    });
});
