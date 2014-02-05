(function () {
  'use strict';

  var connect = require('connect')
    , path = require('path')
    , passport = require('passport')
    , User = require('./user')
    , ExampleOauth2orizeConsumerStrategy = require('./example-oauth2orize-consumer').Strategy
    , app = connect()
    , server
    , port = process.argv[2] || 0
    , pConf = require('./provider-config')
    , lConf = {
        protocol: "http"
      //, host: "oauth2consumer.helloworld3000.com:3001"
      , host: "wardsteward.org:3002"
      }
      // for Ward Steward
    , opts = require('./oauth-config')
    ;

  if (!connect.router) {
    connect.router = require('connect_router');
  }

  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.  However, since this example does not
  //   have a database of user records, the complete Facebook profile is serialized
  //   and deserialized.
  passport.serializeUser(function(user, done) {
    //Users.create(user);
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    var user = obj // Users.read(obj)
      ;

    done(null, user);
  });

  passport.use(new ExampleOauth2orizeConsumerStrategy({
      // see https://github.com/jaredhanson/oauth2orize/blob/master/examples/all-grants/db/clients.js
      clientID: opts.clientId
    , clientSecret: opts.clientSecret
    , callbackURL: lConf.protocol + "://" + lConf.host + "/auth/example-oauth2orize/callback"
    }
  , function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({ profile: profile }, function (err, user) {
        user.accessToken = accessToken;
        return done(err, user);
      });
    }
  ));

  function route(rest) {
    rest.get('/externalapi/account', function (req, res, next) {
      if (false) { next(); }
      var request = require('request')
        , options = {
            url: pConf.protocol + '://' + pConf.host + '/api/userinfo'
          , headers: {
              'Authorization': 'Bearer ' + req.user.accessToken
            }
          }
        ;

      function callback(error, response, body) {
        if (!error && response.statusCode === 200) {
          res.end(body);
        } else {
          res.end('error: \n' + body);
        }
      }

      request(options, callback);
    });
    /*
    */
    rest.get('/auth/example-oauth2orize', passport.authenticate('example-oauth2orize', { scope: ['email'] }));
    rest.get('/auth/example-oauth2orize/callback'
      //passport.authenticate('facebook', { successRedirect: '/close.html?accessToken=blar',
      //                                    failureRedirect: '/close.html?error=foo' }));
    , passport.authenticate('example-oauth2orize', { failureRedirect: '/close.html?error=foo' })
    );
    rest.get('/auth/example-oauth2orize/callback'
    , function (req, res, next) {
        console.log('req.session');
        console.log(req.session);
        var url = '/success.html' // + '?type=fb'
          /*
          + '&accessToken=' + req.session.passport.user.accessToken
          + '&email=' + req.session.passport.user.profile.email
          + '&link=' + req.session.passport.user.profile.profileUrl
          */
          ;

        console.log(url);
        res.statusCode = 302;
        res.setHeader('Location', url);
        res.end('hello');
        // This will pass through to the static module
        //req.url = url;
        //next();
      }
    );
    rest.post('/auth/example-oauth2orize/callback', function (req, res/*, next*/) {
      console.log('req.user', req.user);
      res.end('thanks for playing');
    });
  }

  app
    .use(connect.query())
    .use(connect.json())
    .use(connect.urlencoded())
    .use(connect.compress())
    .use(connect.cookieParser())
    .use(connect.session({ secret: 'keyboard mouse' }))
    .use(passport.initialize())
    .use(passport.session())
    .use(connect.router(route))
    .use(connect.static(path.join(__dirname, 'public')))
    ;

  module.exports = app;

  if (require.main === module) {
    server = app.listen(port, function () {
      console.log('Listening on', server.address());
    });
  }
}());
