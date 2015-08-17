var exports = module.exports = {};

// load the modern build 
var _ = require('lodash');

// To check if person scopes (rights)
exports.Scopes = function (scopes) {
 	return function (req, res, next) {
  		// Get from scope in request (req) payload.
    	var tokenScopes = req.payload.scopes;
    	// Checking for every scope, for val in scope and return it
    	var check = _.every(scopes, function (val) {
      		return _.contains(tokenScopes, val);
    	});
    	// If no Check! return 401
    	if (!check) {
      		return res.send(401, 'insufficient rights');
    	} else {
      		next();
    	}
  	};
};

// Not sure yet.
exports.getScopesFromRequest = function (req) {
  return req.payload.scopes;
};

