/**
 * Module dependencies.
 */
var express = require('express')
    , fs = require('fs')
    , http = require('http')
    , path = require('path')
    , routes = require('./routes');


// Load configuration
var env = process.env.NODE_ENV || 'development'
    , config = require('./config/config')[env];

// Bootstrap db connection
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
mongoose.connect(config.db);


// Bootstrap models
var models_path = __dirname + '/app/models'
    , model_files = fs.readdirSync(models_path);
model_files.forEach(function (file) {
    require(models_path + '/' + file)
})

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
/*
var passport = require("passport")
    , flash = require("connect-flash")
    , LocalStrategy = require("passport-local").Strategy
    ;
    */
// ^^^^^^^^^^^

var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || 43012);
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    //  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    /*
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    */
    //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
/*
var mongoose = require("mongoose")
    , passwordHash = require("password-hash")
    , Relation = mongoose.model("Relation");

passport.deserializeUser(function (id, done) {
    Relation.findOne({ _id: id }, function (err, doc) {
        if (err) {
            return done(err);
        }
        if (!doc) {
            return done(null, false, { message: "Incorrect username." });
        }
        // Create user object
        var user = {};
        user.username = doc.name;
        user.email = doc.email;

        return done(err, user);
    });

});

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
    function (username, password, done) {
        Relation.findOne({ name: username }, function (err, doc) {
            // Verify given password with stored password
            // @see https://github.com/davidwood/node-password-hash/blob/master/README.md
            if (!passwordHash.verify(password, doc.password)) {
                doc = {};
            }

            if (err) {
                return done(err);
            }
            if (!doc) {
                return done(null, false, { message: "Incorrect username." });
            }
            return done(null, doc);
        });
    }
));

// Routes
app.get("/admin", function (req, res) {
    res.render("index", { user: req.user });
});


app.get("/account", ensureAuthenticated, function (req, res) {
    res.render("account", { user: req.user });
});

app.get("/login", function (req, res) {
    res.render("login", { user: req.user, message: req.flash("error") });
});

app.post("/login",
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    function (req, res) {
        res.redirect("/cars");
    });

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}
*/
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Bootstrap views
app.get('/', routes.index);
app.get('/restDemo', routes.restDemo);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

// Bootstrap routes
require('./routes/routes.js')(app);
