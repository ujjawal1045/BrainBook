const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req,res) {
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });

    });
    
}

module.exports.update =  async function(req, res) {
    // if(req.user.id == req.params.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    //         req.flash('success', 'User updated!');
    //         return res.redirect('back');
    //     });
    // } else {
        // req.flash('error', 'Unauthorised');
        // return res.status(401).send('unauthorised');
    // }
    if(req.user.id == req.params.id) {
        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log('******multer error*****', err)}
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    //this is saving the path of uploaded file in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');
            });

        }catch(err) {
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'Unauthorised');
        return res.status(401).send('unauthorised');
    }
}

//rendering signUp page
module.exports.signUp = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'BrainBook|| sign Up'
    });
}

//rendering signIn page
module.exports.signIn = function(req, res) {
    //using this to manage back button when login
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'BrainBook|| sign In'
    });
}

//geting the signup data
module.exports.create = function(req, res) {
    if(req.body.password != req.body.confirm_password) {
        req.flash('error', 'Password and confirm password must be same!');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            req.flash('error',err);
            return;
        }
        if(!user) {
            User.create(req.body, function(err, user) {
                if(err) {
                    req.flash('error',err);
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        } else {
            req.flash('success','you have signed Up! login to continue!');
                return res.redirect('/users/sign-in');
        }
    });
}

//creating session by signin
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

//destrou session'
module.exports.destroySession = function(req, res) {
    
    req.logout(function(err) {
        if (err) {return next(err);}
    req.flash('success', 'Logged Out Successfully');
    return res.redirect('/');

    });

    
    
}