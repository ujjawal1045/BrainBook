const express = require('express');
const app = express();
const port = 8000;


//01//use express router(connecting our index rout with main index.js)
app.use('/',require('./routes'));


app.listen(port, function(err) {
    if(err) {
        console.log(`error in running the server: ${err} `);
    }
    console.log(`server is running on port: ${port}`);
});