const exec = require('child_process').exec;
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const QRCode = require('qrcode');
const port = 3000;
    

app.get('/file', function (req, res) {
    fs.readdir(path.join(__dirname, './File/'), (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve files' });
        }
        res.json(files[0]);
    });
});

app.get('/', function (req, res) {

    exec("C:\\Users\\prasu\\Documents\\Web-Dev-Projects\\Cohort-Projects\\Remote-File-Sharer\\ip.bat", function(err, stdout, stderr) {
        if (err) {
            console.log('Error: ' + stderr);
        } else {
            console.log(stdout);
        }
    });
    
    setTimeout(() => {
        fs.readFile('./output.txt', 'utf-8', (err, data) => {
            let ip;
            if(err) {
                console.log(err);
            } else {
                let ind = data.indexOf('IPv4 Address. . . . . . . . . . . : ') + 'IPv4 Address. . . . . . . . . . . : '.length;
                for(let i = ind; i <= ind + 15; i++) {
                    if(data.charAt(i) == '\n') {
                        ip = data.substring(ind, i-1);
                        break;
                    }
                }
            }
            
            console.log(ip);
            console.log('http://' + ip + ":" + port + '/getFile');
            QRCode.toFile('./output.png', 'http://' + ip + ":" + port + '/getFile', {
                color: {
                dark: '#000000',  // Black dots
                light: '#ffffff' // White background
                }
            }, function (err) {
                console.log('here')
                if (err) {
                    throw err;
                }
                console.log('done')
            })
        });
    }, 500);

    res.sendFile(__dirname + "/output.png");
});

app.get('/getFile', function(req, res) {
    fs.readdir('C:\\Users\\prasu\\Desktop\\Dumb-Works\\Remote-File-Sharer\\File', (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve file' });
        }
        const filepath = path.join('C:\\Users\\prasu\\Desktop\\Dumb-Works\\Remote-File-Sharer\\File', files[0]);
        res.download(filepath);
    });
    
});

app.get('/shutdown', function(req, res) {
    console.log('Server shutting down...');
    res.send('Server shutting down...');
    process.exit(0);
});


app.all('*', (req, res) => {
    res.status(404).send('Route not found');
});

app.listen(port, function() {
    console.log('Listening at http://127.0.0.1:' + port);
});
