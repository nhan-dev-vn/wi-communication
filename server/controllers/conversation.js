var models = require('../database/db-connect');
var response = require('./response');
var User = models.User;
var Conversation = models.Conversation;
var Message = models.Message;
var Op = models.Op;
var socket_io = require('../socket.io/socket.io').socket_io;

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
				if(conver) {
					if(req.body.users) conver.addUsers(req.body.users);
					if(conver.name.indexOf('Help_Desk')!=-1) (socket_io.socket).broadcast.emit('join-help-desk', conver);
					res.send(response(200, 'SUCCESSFULLY', {user: req.decoded, conver: conver}));
				}
				else res.send(response(404, 'NOT FOUND & CREATE FAIL'));
			}).catch(err => {
				console.error(err);
				res.send(response(400, 'SOMETHING WENT WRONG: ' + err));
			});
		}
	}).catch(err => {
		console.error(err);
		res.send(response(400, 'SOMETHING WENT WRONG: ' + err));
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
			res.send(response(400, 'SOMETHING WENT WRONG: ' + err));
		}
	}).catch(err => {
		console.error(err);
		res.send(response(400, 'SOMETHING WENT WRONG: ' + err));
	})
}
