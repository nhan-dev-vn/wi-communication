let router = require('express').Router();
let userCtrl = require('../controllers/user');


router.post('/login', function(req, res) {
    userCtrl.login(req, res);
})

module.exports = router;