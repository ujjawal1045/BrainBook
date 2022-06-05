 const Post = require('../models/post');
const User = require('../models/user');
 const user = require('../models/user');
 module.exports.home = function(req,res) {
//     //return res.end('<h1>Express i s up for BrainBook!</h1>');
//     // console.log(req.cookies);
//     // res.cookie('user_id', 25);
//     // Post.find({}, function(err, posts){
//     //     return res.render('home', {
//     //         title: "firstpage",
//     //         posts: posts
//     //     });
//     // });

// populate the user of each post
Post.find({})
.populate('user')
.populate({
    path: 'comments',
    populate: {
        path: 'user'
    }
})
.exec(function(err, posts){
    User.find({}, function(err, users){
        return res.render('home', {
            title: "BrainBook | Home",
            posts:  posts,
            all_users: users
        });
    });
    // return res.render('home', {
    //     title: "BrainBook | Home",
    //     posts:  posts
    // });
})

}
//module.exports.acrtionname


    

    