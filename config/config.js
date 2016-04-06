var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'www'
    },
    port: 3000,
    db: 'mongodb://localhost/www-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'www'
    },
    port: 3000,
    db: 'mongodb://localhost/www-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'www'
    },
    port: 3000,
    db: 'mongodb://localhost/www-production'
  }
};

module.exports = config[env];
