var jwt = require('jsonwebtoken');
var response = require('./response')
var models = require('../database/db-connect');
var User = models.User;
var Conversation = models.Conversation;
var Message = models.Message;

module.exports.login = (req, res) => {
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		var token = jwt.sign(req.body, 'secretKey');
		if (user) {
			res.send(response(200, 'SUCCESSFULLY', {user: user, token: token}));
		} else {
			res.send(response(400, 'SOMETHING WENT WRONG'));
		}
	}).catch(err => {
		res.send(response(400, 'SOMETHING WENT WRONG'));
	});
}
module.exports.getUser = (req, res) => {
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (user) {
			res.send(response(200, 'SUCCESSFULLY', user));
		} else {
			User.create({
				username: req.body.username
			}).then(user => {
				if (user)
					res.send(response(200, 'SUCCESSFULLY', user));
				else
					res.send(response(400, 'SOMETHING WENT WRONG'));
			}).catch(err => {
				res.send(response(400, 'SOMETHING WENT WRONG'));
			});
		}
	}).catch(err => {
		res.send(response(400, 'SOMETHING WENT WRONG'));
	});
}

