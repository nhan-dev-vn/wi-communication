var models = require('../database/db-connect');
var response = require('./response')
var Message = models.Message;
var User = models.User;
var Conversation = models.Conversation;
var appProfile = require('../app-init');
var PendingConversation = models.PendingConversation;

module.exports.postMessage = (req, res) => {
	let newMessage;
	Message.create({
		content: req.body.content,
		type: req.body.type,
		idConversation: req.body.idConversation,
		idSender: req.body.idSender,
		sendAt: req.body.sendAt
	}).then(message => {
		if (message) {
			//add pending message to all user after message is created
			//find conversation with all user in that conversation
			//for each user in that conversation except sender , asign idMessage to user's idPendingMessages

			newMessage = message;
			return Conversation.findOne({
				where: { id: req.body.idConversation },
				include: {
					// model: PendingConversation,
					// include: {
					// 	model: User
					// }
					model: User
				}
			})
			// res.send(response(200, 'SUCCESSFULLY', message));
			// appProfile.io.in(req.body.idConversation).emit('sendMessage', req.body);
		}
		else
			res.send(response(400, 'CREATE FAIL'));
	}).then(conv => {
		if (!conv) throw new Error('No conversation is founded');
		const { Users: users } = conv;

		// return res.send({conv})
		// users.forEach(user => {
		// 	// user.addUserPending(idMessage)
		// 	// user.
		// })
		return Promise.all(users
			.filter(u => u.id !== req.body.idSender)
			.map(u => PendingConversation.create({
				idConversation: conv.id,
				idUser: u.id
			})))

		// return Promise.all(users.map(u => u.save()))

		// res.status(200).send({message});
	}).then(() => {
		// res.status(200).send({message: 'success'})
		res.send(response(200, 'SUCCESSFULLY', newMessage));
		appProfile.io.in(req.body.idConversation).emit('sendMessage', req.body);
	}).catch(err => {
		console.error(err);
		res.send(response(404, 'SOMETHING WENT WRONG: ' + err));
	});





}
