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
		},
        order: [[Message, 'createdAt', 'ASC']]
	}).then(conver => {
		if (conver) {
			res.send(response(200, 'SUCCESSFULLY', {user: req.decoded, conver: conver}));
		} else {
			Conversation.create({
				name: req.body.name
			}).then(conver => {
				res.send(response(200, 'SUCCESSFULLY', {user: req.decoded, conver: conver}));
			}).catch(err => {
				console.error(err);
				res.send(response(400, 'SOMETHING WENT WRONG 2'));
			});
		}
	}).catch(err => {
		console.error(err);
		res.send(response(400, 'SOMETHING WENT WRONG 1'));
	})
}
module.exports.getListConversation = (req, res) => {
	Conversation.findAll({
		where: {
			name: { [Op.like]: 'Help_Desk-%' }
		},
		include: {
			model: Message,
			include: {
				model: User
			}
		},
        order: [[Message, 'createdAt', 'ASC']]
	}).then(list => {
		if (list) {
			res.send(response(200, 'SUCCESSFULLY', list));
		} else {
			console.error('No conversation');
			res.send(response(400, 'SOMETHING WENT WRONG 2'));
		}
	}).catch(err => {
		console.error(err);
		res.send(response(400, 'SOMETHING WENT WRONG 1'));
	})
}
