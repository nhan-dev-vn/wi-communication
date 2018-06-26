var fs = require('fs');
var jsonResponse = require('./response');
var thumb = require('node-thumbnail').thumb;
var PATH = require('path');
module.exports.upload = (req, res) => {
    fs.access(PATH.join(__dirname, '../database/upload/'+req.body.name), (err) => {
        if (err) {
            console.log(err);
            fs.mkdirSync(PATH.join(__dirname, '../database/upload/' + req.body.name), function(err) {
                if(err) { 
                    console.log(err);
                    res.send(jsonResponse(400, 'CREATE FOLDER FAIL: ' + err));
                }
            });
        }
        else
            console.log('exist');

        let file = req.files.file;
        let fileName = Date().split(' ').join('') + file.name;
        let path = PATH.join(__dirname, '../database/upload/' + req.body.name + '/' + fileName);
        fs.copyFile(file.path, path, (err) => {
            if (err) {
                console.error(err);
                res.send(jsonResponse(400, 'UPLOAD FAIL: ' + err));
            }
            else{
                let thumbTo = PATH.join(__dirname, '../database/upload/' + req.body.name);
                if(file.type.indexOf('image')!=-1)
                thumb({
                    source: path, 
                    destination: thumbTo,
                    width: req.body.width
                }, function(files, err) {
                    if(err) {
                        console.log(err);
                        res.send(400, 'THUMB IMAGE FAIL', err);
                    } else {
                        console.log('----------DONE THUMB----------');
                        res.send(jsonResponse(200, 'SUCCESSFULLY', 'http://13.251.24.65:5001/' + req.body.name + '/' + fileName));
                    }
                }); else res.send(jsonResponse(200, 'SUCCESSFULLY', 'http://13.251.24.65:5001/' + req.body.name + '/' + fileName));
            }
        });

    })
};
