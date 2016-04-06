var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    Users = mongoose.model('Users');

module.exports = function (app) {
    app.use('/security', router);
};

// As with any middleware it is quintessential to call next()
// if the user is authenticated
/*
var isAuthenticated = function (req, res, next) {
if (req.isAuthenticated())
    return next();
    res.redirect('/admin/login');
}*/



//passport.use(new LocalStrategy(function(username, password, done) {
passport.use('local', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : false // allows us to pass back the entire request to the callback
},
function(username, password, done) {
    //console.log(User)
    //console.log(username)
    //console.log(password)
    process.nextTick(function() {
        Users.findOne({'email': username}, function(err, user) {
            if (err) {
                console.log(err)
                return done(err);
            }

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            /*if (user.password != password) {
                return done(null, false, { message: 'Incorrect password.' });
            }*/

            return done(null, user);
        });
    });

}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
        done(err, user);
    });
});


 
router.get('/login', function (req, res, next) {
    res.render('security/login', {
        title: 'Login'
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect : '/admin', // redirect to the secure profile section
    failureRedirect : '/security/error', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


router.get('/error', function(req, res, next) {
    console.log(req.flash('error'));
    res.redirect('/security/login');
});


router.get('/register', function (req, res, next) {
    console.log("register");
    res.render('security/register', {
        title: 'Register'
    });
});

router.post('/register', function (req, res, next) {
    Users.register(new Account({ username : req.body.name }), req.body.password, function(err, account) {
        if (err) {
            return res.render("security/register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/admin');
        });
    });
});



