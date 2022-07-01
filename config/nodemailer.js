const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')



let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,//only true for port no 465, false for other all port
    auth: {
        user: 'ujjawals286',
        pass: 'xpnaiuvkbbcmgjcz'
    }

});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template) {
            if(err) {
                console.log('err in rendering template');
                return
            }

            mailHTML = template;

        }
    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}

