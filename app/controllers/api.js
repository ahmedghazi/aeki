var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    _app,
    Posts = mongoose.model('Posts'),
    Users = mongoose.model('Users'),
    ig = require('instagram-node').instagram(),
    ACCESS_TOKEN,
    CLIENT_ID,
    CLIENT_SECRET;

/************************************

    INSTAGRAM
    CLIENT_ID   a9018a7cc25a452aa82e3b01247657a7
    CLIENT SECRET   39485496bd55461cb0edca3e5b47a0df
    ACCESS_TOKEN    242381471.a9018a7.0a579aaa6778451bb3554c387a54eb61
    ACCESS_TOKEN DPLACE   406442128.5725604.7a4ca2a4f84c41728d7978216b091135

*************************************/

module.exports = function (app) {
    _app = app;
    app.use('/api', router);

    ACCESS_TOKEN = "242381471.a9018a7.0a579aaa6778451bb3554c387a54eb61";
    CLIENT_ID = "a9018a7cc25a452aa82e3b01247657a7";
    CLIENT_SECRET = "39485496bd55461cb0edca3e5b47a0df";

    ig.use({ 
        client_id: 'a9018a7cc25a452aa82e3b01247657a7',
        client_secret: '39485496bd55461cb0edca3e5b47a0df' 
    });

    //console.log(ig)
};

/************************************

    OAUTH
    https://github.com/totemstech/instagram-node

*************************************/
var redirect_uri = 'http://localhost:3000/api/redirect_uri';
 
exports.authorize_user = function(req, res) {
  res.redirect(ig.get_authorization_url(redirect_uri, { scope: ['likes','public_content'], state: 'a state' }));
};
 
exports.handleauth = function(req, res) {
  ig.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send('You made it!!');
    }
  });
};
 
// This is where you would initially send users to authorize 
router.get('/authorize_user', exports.authorize_user);
// This is your redirect URI 
router.get('/redirect_uri', exports.handleauth);

/************************************

    API CALL

*************************************/
router.get('/tag/:id', function (req, res, next) {
    ig.use({ access_token: "406442128.5725604.7a4ca2a4f84c41728d7978216b091135" });
    /*ig.tag_media_recent(req.params.id, [], function(err, result, remaining, limit) {
        if (err) {
            return res.send(err);
        }
        console.log(remaining);
        console.log(limit);
        res.json(result);
    });
    */
    var params = { min_tag_id: "0", max_tag_id: "" }
    ig.tag_media_recent(req.params.id, {count:500}, function(err, medias, pagination, remaining, limit) {
        if (err) {
            return res.send(err);
        }
        console.log("pagination ",pagination);
        console.log("remaining ",remaining);
        console.log("limit ",limit);
        console.log(medias.length)
        res.json(medias);
    });

});
/*
router.get('/', function (req, res, next) {
    post.find(function (err, posts) {
        if (err) return next(err);
        res.render('index', {
            title: 'Admin',
            posts: posts
        });
    });
});
*/

/************************************

    CRUD POSTS

*************************************/
// ALL
router.get('/posts', function (req, res, next) {
    Posts.find(function(err, posts) {
        if (err) {
            return res.send(err);
        }

        res.json(posts);
    });
});

// CREATE
router.post('/posts', function (req, res, next) {
    console.log(req.body)
    var date = new Posts(req.body);

    date.save(function(err) {
        if (err) {
            return res.send(err);
        }

        res.send({ message: 'Date Added' });
    });
});

// GET ONE
router.get('/posts/:id', function (req, res, next) {
    Posts.findOne({ _id: req.params.id}, function(err, date) {
        if (err) {
          return res.send(err);
        }

        res.json(date);
    });
});

// UPDATE ONE
router.put('/posts/:id', function (req, res, next) {
    Posts.findOne({ _id: req.params.id }, function(err, date) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            post[prop] = req.body[prop];
        }

        // save the post
        date.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'Post updated!' });
        });
    });
});

// DELETE ONE
router.delete('/posts/:id', function (req, res, next) {
    Posts.remove({
        _id: req.params.id
    }, function(err, post) {
        if (err) {
          return res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
    });
});

/************************************

    CRUD USER

*************************************/
// ALL
router.get('/users', function (req, res, next) {
    Users.find(function(err, user) {
        if (err) {
            return res.send(err);
        }

        res.json(user);
    });
});

// CREATE
router.post('/users', function (req, res, next) {
    console.log(req.body)
    var user = new Users(req.body);

    user.save(function(err) {
        if (err) {
            return res.send(err);
        }

        res.send({ message: 'User Added' });
    });
});

// GET ONE
router.get('/users/:id', function (req, res, next) {
    Users.findOne({ _id: req.params.id}, function(err, user) {
        if (err) {
          return res.send(err);
        }

        res.json(user);
    });
});

// UPDATE ONE
router.put('/users/:id', function (req, res, next) {
    Users.findOne({ _id: req.params.id }, function(err, user) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            user[prop] = req.body[prop];
        }

        // save the post
        user.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'User updated!' });
        });
    });
});

// DELETE ONE
router.delete('/users/:id', function (req, res, next) {
    Users.remove({
        _id: req.params.id
    }, function(err, user) {
        if (err) {
          return res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
    });
});

