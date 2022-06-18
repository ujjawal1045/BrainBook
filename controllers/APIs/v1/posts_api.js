const Post= require('../../../models/post');
const Comment = require('../../../models/comment'); 
module.exports.index =async  function(req, res){


    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message:"lists of post",
        post:posts
    })
}


module.exports.destroy =async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);
        
        //if(post.user == req.user.id){
            post.remove();
            //return res.redirect('back');
            await Comment.deleteMany({post: req.params.id}) ;



            // if(req.xhr){
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         },
            //         message: "post deleted!"
            //     });
            // }



            //req.flash('success', 'Post and associated comment deleted');

                return res.json('200',{
                    message: "post and associated comment deleted"
                });
        // } else {
        //     req.flash('error', 'You cannot delete this post');

        //     return res.redirect('back');
        // }
    } catch(err) {
        //req.flash('error', err);

        return res.json('500',{
            message: "internal server error"
        });
    }
   
}