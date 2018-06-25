var fs = require('fs');
var jsonResponse = require('./response');

module.exports.upload = (req, res) => {
    fs.access('./database/upload/' + req.body.name, (err) => {
        if (err)
            fs.mkdirSync('./database/upload/' + req.body.name, function(err) {
                if(err) { 
                    console.error(err);
                    res.send(jsonResponse(400, 'CREATE FOLDER FAIL: ' + err));
                }
            });
        else
            console.log('exist');

        let file = req.files.file;
        let fileName = Date().split(' ').join('') + file.name;
        let path = './database/upload/' + req.body.name + '/' + fileName;
        fs.copyFile(file.path, path, (err) => {
            if (err) {
                console.error(err);
                res.send(jsonResponse(400, 'UPLOAD FAIL: ' + err));
            }
            else
                res.send(jsonResponse(200, 'SUCCESSFULLY', 'http://localhost:5005/' + req.body.name + '/' + fileName));
        });

    })
};
