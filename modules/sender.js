const fs = require('fs')
const http = require('http')

module.exports = (server_config, callback) => {

    fs.readFile('exports/data.xml', function read(err, data) {
        if (err) {
            throw err;
        }
        
        const tosend = data;
        //const toSendStr = 'titi : [{toto : {"test" : "coucou"}}]'
        
        server_config['headers'] = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': tosend.length
        }


        let buffer = "";
        var req = http.request(server_config, function(res) {
            res.on('data', function (chunk) {
                buffer += chunk;
                console.log('processing');
            });
            
            res.on('process', function (chunk) {
                console.log('processing');
            });
            
            res.on('end', function(data) {
                console.log('Le fichier XML a bien envoyé au serveur!');                
            });
        });

        req.write(tosend);
        req.end();
        
        
    });
}