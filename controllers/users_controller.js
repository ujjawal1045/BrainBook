module.exports.profile = function(req,res) {
    return res.render('user_profile', {
        title: 'User Profile'
    });
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
    //TODO
}

//creating session by signin
module.exports.createSession = function(req, res) {
    //TODO
}