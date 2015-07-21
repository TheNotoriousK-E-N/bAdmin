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
// Routing
//===================
var routes = require('./app/routes/routes')(app, express);
app.use('/', routes);


//===================
// Server Startup
//===================
app.listen(config.port, config.loc);  // This command actually starts the server
console.log(("Server running at " + config.siteUrl + ":" + config.port + "").toString().rainbow); // Server-side confirmation, outputs to terminal
 