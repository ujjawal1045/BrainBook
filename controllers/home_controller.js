module.exports.home = function(req,res) {
    //return res.end('<h1>Express i s up for BrainBook!</h1>');
    return res.render('home', {
        title: "firstpage"
    });
}
//module.exports.acrtionname