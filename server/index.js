const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');;
const { getTrucksController } = require('./trucks');

const httpsPort = 5000;
const app = express();

app.use(bodyParser.json());

//routes
app.get("/", getTrucksController);

http
    .createServer({}, app)
    .listen(httpsPort, () => {
        console.log(
            `Node is running on port ${httpsPort}`
        );
    });