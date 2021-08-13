#!/usr/bin/env node

const { off } = require('process');
const readline = require('readline');
const service = require('./service');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let offset = 0;

const renderData = (offset) => {
    service.getTrucks(4, '10:00', offset)
    .then(res => {
        console.table("Food Trucks", res)
        console.table(`Page=>${offset / 10}`)
    });
}

var recursiveAsyncReadLine = function () {
    rl.question("Please Choose an option:\n"
        + "(n)ext, (p)revious, or (e)xit\n\n"
        , function (line) {
            switch (line){
                case "n":
                    offset += 10;
                    renderData(offset);
                    break;
                case "p":
                    offset -= 10;
                    if (offset < 0) offset = 0;
                    renderData(offset);
                    break;
                case "e":
                    return rl.close();
                    break;
                default:
                    console.log("No such option. Please enter another: ");
            }
    recursiveAsyncReadLine(); //Calling this function again until exit
    });
};

recursiveAsyncReadLine(); 