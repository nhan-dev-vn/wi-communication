const PORT = 5000;

let appProfile = require('./app-init');


appProfile.server.listen(PORT, function () {
	console.log('\n============================ LISTENING ON PORT ', PORT, '================================\n');
});

