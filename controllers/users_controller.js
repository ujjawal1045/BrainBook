const User = require('../models/user');


module.exports.profile = function(req,res) {
    if(req.cookies.user_id) {
        User.findById(req.cookies.user_id, function(err, user) {
            if(user) {
                return res.render('user_profile', {
                    title: 'User Profile',
                    user:user
                })
            } else {
                return res.redirect('/users/sign-in');
            }
        });
    } else {
        return res.redirect('/users/sign-in');

    }
    
}

//rendering signUp page
module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: 'BrainBook|| sign Up'
    });
}

//rendering signIn page
module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: 'BrainBook|| sign In'
    });
}

//geting the signup data
module.exports.create = function(req, res) {
    if(req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log('error in finding user');
            return;
        }
        if(!user) {
            User.create(req.body, function(err, user) {
                if(err) {
                    console.log('error in signing up the user');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        } else {
                return res.redirect('back');
        }
    });
}

//creating session by signin
module.exports.createSession = function(req, res) {
    //finding user
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log('eror in finding user');
            return;
        }
        //handle user found
        if(user) {

            //handle passweord mismatch
            if(user.password != req.body.password) {
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            //handle user not found
            return res.redirect('back');
        }
    });
}


