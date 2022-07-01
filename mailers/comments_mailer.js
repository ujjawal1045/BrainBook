const nodeMailer = require('../config/nodemailer');

//another way of exporting a method
exports.newComment = (comment)=> {
    //console.log('inside newComment mailer', comment);
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'ujjawals286@gmail.com',
        to: comment.user.email,
        subject: "New comment on your post",
        //html: '<h1> Yup, your comment is now published!</h1>'
        html: htmlString
    }, (err, info) => {
        if(err) {
            console.log('error in sending the email',err);
            return;
        }

        console.log('Comment successful', onfo);
        return;
    });
} 