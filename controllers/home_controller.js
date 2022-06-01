 const Post = require('../models/post');
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
    return res.render('home', {
        title: "Codeial | Home",
        posts:  posts
    });
})

}
//module.exports.acrtionname


    

    