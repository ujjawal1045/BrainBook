{
    // method to submit the form data for new post using ajax

    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();


            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#Posts-list-container>ul').prepend(newPost);
                    // console.log(data);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
// method to create a post in dom

let newPostDom = function(post){
    return $(`<li id="post-${post._id}">
                <div class="post-top">
                <div class="dp">
                    <img src="./images/girl.jpg" alt="">
                </div>
                <div class="post-info">
                    <p class="name"> ${ post.user.name} </p>
                    <span class="time"> ${ post.user.createdAt } </span>
                </div>
                <i class="fas fa-ellipsis-h"></i>
            </div> 

                <!-- post content -->
            <div class="post-content">
                
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post.id}">X</a>
                    </small>
                    
                    ${ post.content}
            </div>

            <!-- post bottom  -->
            <div class="post-bottom">
                <div class="action">
                    <i class="far fa-thumbs-up"></i>
                    <span>Like</span>
                </div>
                <div class="action">
                    <i class="far fa-comment"></i>
                    <span>Comment</span>
                    
                        <form action="/comments/create" method="post">
                                <input type="text " name="content" placeholder="type here to add comment.." >
                                <input type="hidden" name="post" value="${ post._id}">
                                <input type="submit" value="Add Comment">
                        </form>
                        

                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id}">
                            

                            </ul>
                    </div>
                </div>
                <div class="action">
                    <i class="fa fa-share"></i>
                    <span>Share</span>
                </div>
            </div>

            </li>`)
}
    createPost();
}