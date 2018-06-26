var response = require('./response');
var thumb = require('node-thumbnail').thumb;
var path = require('path');
module.exports.thumb = function(req, res) {
    res.send(response(200, 'SUCCESS', req.body.path));
    /*
    let path = req.body.path.substr(0, req.body.path.lastIndexOf('/'));
    thumb({
        source: './databse/upload/Help_Desk-chat3/MonJun252011807:46:38GMT+0000(UTC)chat1.PNG',
        destination: './database/upload/Help_Desk-chat3',
        width: req.body.width
    }, function(files, err, stdout, stderr) {
        if(err) {
            console.log(err);
            response(200, req.body.path);
        } else {
            response(200, path);
        }
    });
    */
}
/*thumb({
    source: path.join(__dirname, '../database/upload/test/chat1.PNG'),
    destination: path.join(__dirname, '../database/upload/test'),
    width: 200
}, function(files, err){if(err) console.log(err);else console.log('done');});*/
