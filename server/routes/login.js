let router = require('express').Router();
let userCtrl = require('../controllers/user');


router.post('/login', function(req, res) {
    userCtrl.login(req, res);
});
router.post('/register', function(req, res) {
    userCtrl.register(req, res);
});

module.exports = router;