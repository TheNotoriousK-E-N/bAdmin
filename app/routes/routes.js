//  /app/routes/routes.js
//  
module.exports = function(app){

	// default '/' route
	app.get('/', function(req, res){
		res.send('Hey! This is the home page for now!');
	})
}