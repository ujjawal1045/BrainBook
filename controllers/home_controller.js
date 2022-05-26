module.exports.home = function(req,res) {
    //return res.end('<h1>Express i s up for BrainBook!</h1>');
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    return res.render('home', {
        title: "firstpage"
    });
}
//module.exports.acrtionname