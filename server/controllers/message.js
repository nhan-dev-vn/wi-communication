var models = require('../database/db-connect');
var response = require('./response')
var Message = models.Message;
var User = models.User;
var Conversation = models.Conversation;
var appProfile = require('../app-init');

module.exports.postMessage = (req, res) => {
	Message.create({
		content: req.body.content,
		type: req.body.type,
		idConversation: req.body.idConversation,
		idSender: req.body.idSender,
        sendAt: req.body.sendAt
	}).then(message => {
		if (message) {
			res.send(response(200, 'SUCCESSFULLY', message));
			appProfile.io.in(req.body.idConversation).emit('sendMessage', req.body);
		}
		else
			res.send(response(400, 'CREATE FAIL'));
	}).catch(err => {
		console.error(err);
		res.send(response(404, 'SOMETHING WENT WRONG: ' + err));
	});
}
