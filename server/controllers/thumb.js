var response = require('./response');
var thumb = require('node-thumbnail').thumb;
var path = require('path');
var md5 = require('md5');
const WIDTH_IMAGE_THUMB = 150;
module.exports.thumb = function(req, res) {
    var original_dir = path.join(__dirname, '../database/upload/'+req.params.folder+req.params.fileName);
    var thumb_dir = path.join(__dirname, '../database/upload/'+ req.params.folder+ '/thumb');
    thumb({
        source: original_dir,
        path: thumb_dir,
        basename: md5(req.params.fileName),
        suffix: '',
        width: WIDTH_IMAGE_THUMB,
        skip: true,
        overwrite: false
    }, function(files, err){
        if(err) {
            console.log(err);
            res.send(response(400, 'THUMB FAIL', err));
        }
        else {
            var lastDots = req.params.fileName.lastIndexOf('.');
            var typeFile = req.params.fileName.substring(lastDots, req.params.fileName.length);
            var pathOutFile = path.join(thumb_dir, md5(req.params.fileName) + typeFile);
            console.log(pathOutFile);
            res.sendFile(pathOutFile);
        }
    });
}

