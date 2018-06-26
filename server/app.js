const PORT = 5001;
const path = require('path');

let appProfile = require('./app-init');
appProfile.app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../client/index.html'));
});

appProfile.server.listen(PORT, function () {
	console.log('\n============================ LISTENING ON PORT ', PORT, '================================\n');
});

