// /server.js


//====================
// Modules
// ===================
// 
// ----Express--------
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
//-----Misc------------
var colors = require('colors');

//===================
// Configuration
//===================
var app = express();
var config = require('./config'); 

//===================
// Configuration
//===================
require('./app/routes/routes')(app);


//===================
// Server Startup
//===================
app.listen(config.port, config.loc);
console.log(("Server running at " + config.siteUrl + ":" + config.port + "").toString().rainbow);
 