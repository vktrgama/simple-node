const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');;
const { compareJsonFiles } = require('./compare-json');

const httpsPort = 5000;
const app = express();

app.use(bodyParser.json());

//routes
app.get("/", compareJsonFiles);

http
    .createServer({}, app)
    .listen(httpsPort, () => {
        console.log(
            `Node is running on port ${httpsPort}`
        );
    });