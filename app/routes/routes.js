var config = require('../../config');
var superSecret = config.secret;
var User = require('../models/model_users')

module.exports = function(app, express){
	app.get('/', function(req, res){ 			// base URL for homepage
		res.send('Welcome To The Index.');
	});

	
	//==========================
	// API Routes
	//==========================
	var apiRoutes = express.Router();

	// Routes
	apiRoutes.use(function(req, res, next) {
		// log!
		console.log('Somebody all up in our app!');
		// TODO:
		// Add Authentication Middleware
		next();
	});

	apiRoutes.get('/', function(req, res){
		res.json({ message: 'Check out this A P I !!!11!!' });
	});

	apiRoutes.route('/users')
		// create a user
		.post(function(req, res){  
			var user = new User();
			//set info (comes from request)
			user.firstName = req.body.firstName;
			user.lastName = req.body.lastName;
			user.userName = req.body.userName;
			user.password = req.body.password;

			// save and check for errors
			user.save(function(err){
				if(err) {
					// duplicate?
					if (err.code == 11000) {
						return res.json({ success: false, message: 'Username already exists'});
					}
					else {
						return res.send(err);
					}
				}
				else {
					res.json({ message: 'User created.' });
				}
			});
		})

		// retrieve all
		.get(function(req, res){
			User.find(function(err, users) {
				if(err) {
					res.send(err);
				}
				else {
					// return all users
					res.json(users);
				}
			});
		});

	return apiRoutes;
}




