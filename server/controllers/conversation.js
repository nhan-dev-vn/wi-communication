var models = require('../database/db-connect');
var response = require('./response');
var User = models.User;
var Conversation = models.Conversation;
var Message = models.Message;
var Op = models.Op;
var PendingConversation = models.PendingConversation;
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
        order: [[Message, 'sendAt', 'ASC']]
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
        order: [[Message, 'sendAt', 'ASC']]
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


module.exports.getPendingConversation = (req, res) => {
	const { idUser } = req.body;

	if(!idUser) return res.send(response(400, 'idUser is required', 'idUser is required'));

	PendingConversation.findAll({
		where: {
			idUser
		}
	}).then(conversations => {

		//remove duplicate conversation
		const set = {};

		const _conv = conversations.filter((conv, i) => {
			if(i === 0 || !set[conv.idConversation]) {
				set[conv.idConversation] = true;
				return true;
			}
			
			return false;
		})

		res.send(response(200, 'SUCCESSFULLY', _conv));
	})
}

module.exports.seenConversation = (req, res) => {
	const {idUser, idConversation} = req.body;

	if(!idUser) return res.send(response(400, 'idUser is required', 'idUser is required'));
	if(!idConversation) return res.send(response(400, 'idConversation is required', 'idConversation is required'));

	PendingConversation.destroy({
		where: {
			idConversation,
			idUser
		}
	}).then(() => {
		res.send(response(200, 'SUCCESS', 'SUCCESS'))
	}).catch((e) => {
		res.send(response(400, 'SOME THING WENT WRONG ' + e, 'SOME THING WENT WRONG ' + e));
	})
}