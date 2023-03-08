const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const child_process = require('child_process');

// app.disable('x-powered-by');


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', ' Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', ' 3.2.1');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

const defaultTile = fs.readFileSync(path.join(__dirname, './tile.jpg'));

//tile server
app.get('/tile/:z/:x/:y', function (req, res, next) {
    setTimeout(() => {
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.write(defaultTile, 'binary');
        res.end();
    }, 10000 * Math.random());
})
//simple json query
app.get('/json/get', function (req, res, next) {
    const data = new Array(10).fill(1).map((d, index) => {
        return {
            name: 'hello' + index,
            index
        }
    });
    res.json(data);
})


app.use('/node_modules/', express.static('node_modules'));
app.use('/', express.static('src'));
const port = 9900;
var server = httpServer.listen(port, function () {
    child_process.exec(`start http://localhost:${port}/index.html`);
});