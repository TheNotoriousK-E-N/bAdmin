var config = require('../../config');
var superSecret = config.secret;

module.exports = function(app, express){
	var router = express.Router();

	router.get('/', function(req, res){
		res.send('Welcome to the index.');
	});
	return router;
}




