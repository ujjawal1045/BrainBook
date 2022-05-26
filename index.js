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

app.use(express.urlencoded());
//10//setting up cookie parser
app.use(cookieParser());
//06//tell app to use static file 
app.use(express.static('./assets'));

//05//tell app to use layout
app.use(expressLayouts);
//07//extract style and script from subpages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//01//use express router(connecting our index rout with main index.js)
app.use('/',require('./routes'));

//03//setting up ejs as view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err) {
    if(err) {
        console.log(`error in running the server: ${err} `);
    }
    console.log(`server is running on port: ${port}`);
});