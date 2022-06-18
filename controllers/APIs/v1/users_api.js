const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
module.exports.createSession =async function(req, res) {
    try{
    let user = await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password) {
            return res.json(422, {
                message: "invaild Username or password",

            });
        }

        return res.json(200, {
            message: "signed in successfull and here is your token, please keep it safe1",
            data: {
                token: jwt.sign(user.toJSON(), 'BrainBook', {expiresIn: 100000})
            }
        })
    }
     catch(err) {
        console.log('****',err);
        return res.json(500, {
            message: "internal server error"
        });

    }
}
