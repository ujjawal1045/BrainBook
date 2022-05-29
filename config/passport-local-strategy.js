const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done) {
        //find a user and establish the identity
        User.findOne({email:email}, function(err, user) {
            if(err) {
                console.log('error in finding user ---> passport');
                return done(err);
            }
            if(!user || user.password != password) {
                console.log('invalid username/password');
                return done(null, false);
            }

            return done(null, user);
        });

    }
));


//serializing the user to decide which key is used to be kept in cookie

passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserializing the user from key  in cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user) {
        if(err) {
            console.log('error in finding user ---> passport');
            return done(err);
        }

        return done(null, user);
    });

});


//check if user is aurthenticated
passport.checkAuthentication = function(req, res, next) {
    //if user signed in, then pass on the request to next function(controller action)
    if(req.isAuthenticated()) {
        return next();
    }
    //if user not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()) {
        //req.user contains the currenmt signed user from session cookie and we are just sending to locals for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
