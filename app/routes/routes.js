var config = require('../../config');
var superSecret = config.secret;
var User = require('../models/model_users')
var jwt = require('jsonwebtoken');

module.exports = function(app, express){
	app.get('/', function(req, res){ 			// base URL for homepage
		res.send('Welcome To The Index.');
	});

	app.get

	
	//==========================
	// API Routes
	//==========================
	var adminRoutes = express.Router();

	adminRoutes.post('/authenticate', function(req, res) {
		// find the user
		// select the username and password explicitly
		User.findOne({
			userName: req.body.userName
		}).select('firstName lastName userName password').exec(function(err, user) {
			if(err) {
				throw err;
			}
			if(!user){                     // User not found
				res.json({
					success: false,
					message: 'Authentication failed. User not found.'
				});
			}
			else if(user) {
				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword) {       // Password invalid
					res.json({
						success: false,
						message: 'Authentication failed. Wrong Password.'
					});
				}
				else {                     // User and Password are good
					// Create a token
					var token = jwt.sign({
						firstName: user.firstName,
						lastName: user.lastName,
						userName: user.userName
					}, superSecret, {
						expiresInMinutes: 1440 // 24-Hours
					});

					// return info (with token) as JSON
					res.json({
						success: true,
						message: 'You\'ve been tokenerized!',
						token: token
					});
				}
			}
		});
	});

	// Routes
	adminRoutes.use(function(req, res, next) {
		// log!
		console.log('Somebody all up in our app!');
		next();
	});

	adminRoutes.get('/', function(req, res){
		res.json({ message: 'My Grandma was half Nintendo, dowg.' });
	});

	adminRoutes.route('/users')
		// create a user
		.post(function(req, res){  
			var user = new User();
			//set info (comes from request)
			user.firstName = req.body.firstName;
			user.lastName = req.body.lastName;
			user.userName = req.body.userName;
			user.password = req.body.password;
			user.isAdmin = req.body.isAdmin;

			// save and check for errors
			user.save(function(err){
				if(err) {
					// duplicate?
					if (err.code == 11000) {
						return res.json({ success: false, message: 'Username already exists', err: err.code });
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

		// retrieve a single user by _id
	adminRoutes.route('/users/:user_id')
		.get(function(req, res){
			User.findById(req.params.user_id, function(err, user){
				if(err) {
					res.send(err);
				}
				else { 
					res.json(user);
				}
			});
		})

		// update a single user
		.put(function(req, res){
			User.findById(req.params.user_id, function(err, user){
				if(err) {
					res.send(err);
				}
				else {
					// only update info if new / changed
					if(req.body.firstName) {
						user.firstName = req.body.firstName;
					}
					if(req.body.lastName) {
						user.lastName = req.body.lastName;
					}
					if(req.body.userName) {
						user.userName = req.body.userName;
					}
					if(req.body.password) {
						user.password = req.body.password;
					}
					if(req.body.isAdmin) {
						user.isAdmin = req.body.isAdmin;
					}
					// save the updated user
					user.save(function(err) {
						if(err) {
							res.send(err);
						}
						else {
							res.json({ message: user.userName + " updated!" });
						}
					});
				}
			});
		})
		// add the 'DELETE' route
		.delete(function(req, res){
			User.remove({
				_id: req.params.user_id
			}, function(err, user){
				if(err){
					return re.send(err);
				}
				else {
					res.json({ message: 'User has been succesfully deleted.' })
				}
			})
		})

	return adminRoutes;
}




