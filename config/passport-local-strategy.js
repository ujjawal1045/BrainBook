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

module.exports = passport;
