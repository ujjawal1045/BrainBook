const express = require('express');
//09//require for cookies
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
//04//require layout
const expressLayouts = require('express-ejs-layouts');
//08//connecting mongoose database
const db = require('./config/mongoose');
const createApplication = require('express/lib/express');
//11//using express for passport
const session = require('express-session');
//12//use for session cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//22//passport jwt for api authentication
const passportJWT = require('./config/passport-jwt-strategy');
//23//google oauth for verification
const passportGoogle = require('./config/google-oauth2-strategy');
//15//using mongo-store to store session cookie even if we restart the server
const MongoStore = require('connect-mongo');

//15//using sass for css
const sassMiddleware = require('node-sass-middleware');

//17//flsh for showing flash msg 
const flash = require('connect-flash');
//19//our own middleware for flsh
const customMware = require('./config/middleware');
//16//telling app to use scss
app.use(sassMiddleware({
    src: './assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());
//10//setting up cookie parser
app.use(cookieParser());
//06//tell app to use static file 
app.use(express.static('./assets'));
//21//using path of profile picture(making upload path available to browser)
app.use('/uploads', express.static(__dirname + '/uploads'));

//05//tell app to use layout
app.use(expressLayouts);
//07//extract style and script from subpages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//03//setting up ejs as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongostore is used to store session cookie  
//13//using middleware which take sesion cookie and encrypt it
app.use(session({
    name: 'BrainBook',
    //todo change the secret before deployment in production
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 160)
    },
    store:  MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/brainbook_development',
             autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect mongo-db setup ok');
        }
    )
}));

//14//tell app to use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// 18//
app.use(flash());
//20//
app.use(customMware.SetFlash);

//01//use express router(connecting our index rout with main index.js)
app.use('/',require('./routes'));


app.listen(port, function(err) {
    if(err) {
        console.log(`error in running the server: ${err} `);
    }
    console.log(`server is running on port: ${port}`);
});