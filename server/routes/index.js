
const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();
var express = require('express');
var router = express.Router();

var ctrlMessage = require('../controllers/message');
var ctrlConversation = require('../controllers/conversation');
var ctrlUser = require('../controllers/user');

var ctrlUpload = require('../controllers/upload.js');
const auth = require('../controllers/authenticate');

router.use(auth());
//user
router.post('/user', (req, res) => {
	ctrlUser.getUser(req,res);
});
//message
router.post('/message/new', (req,res) => {
	ctrlMessage.postMessage(req,res);
});
//Conversation
router.post('/conversation', (req, res) => {
	ctrlConversation.getConversation(req, res);
});
//upload
router.post('/upload', multipartyMiddleware, (req, res) => {
    ctrlUpload.upload(req,res);
})
router.get('/download/:folder/:fileName', (req, res) => {
	res.download('./database/upload/' + req.params.folder + '/' + req.params.fileName, req.params.fileName);
});

module.exports = router;
