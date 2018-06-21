var models = require('../database/db-connect');
var response = require('./response');
var User = models.User;
var Conversation = models.Conversation;
var Message = models.Message;
var Op = models.Op;

module.exports.getConversation = (req, res) => {
	Conversation.findOne({
		where: { name: req.body.name },
		include: {
			model: Message,
			include: {
				model: User
			}
		}
	}).then(conver => {
		if (conver) {
			res.send(response(200, 'SUCCESSFULLY', {user: req.decoded, conver: conver}));
		} else {
			Conversation.create({
				name: req.body.name
			}).then(conver => {
				conver.addUsers([1]);
				res.send(response(200, 'SUCCESSFULLY', {user: req.decoded, conver: conver}));
			}).catch(err => {
				res.send(response(400, 'SOMETHING WENT WRONG 2'));
			});

		}
	}).catch(err => {
		res.send(response(400, 'SOMETHING WENT WRONG 1'));
	})
}
module.exports.getListConversation = (req, res) => {
	User.findOne({
		where: {
			username: req.body.username
		},
		include: {
			model: Conversation,
			where: {
				name: { [Op.like]: 'Help_Desk-%' }
			},
			include: {
				model: Message,
				include: {
					model: User
				}
			}
		}
	}).then(user => {
		if (user) {
			res.send(response(200, 'SUCCESSFULLY', user));
		} else {
			res.send(response(400, 'SOMETHING WENT WRONG 2'));
		}
	}).catch(err => {
		res.send(response(400, 'SOMETHING WENT WRONG 1'));
	})
}