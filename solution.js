
const utils = require('./utils');
const itemArray = utils.loadJson();
const service = require('./service');

const { 0: api, 1: timeStamp, 2: token } = itemArray;

const isValidURL = (url) => {
    let uri = null;
    try {
        uri = new URL(url);
    } catch {
        return false;
    }
    return (uri.protocol === "https" || uri.protocol === "http");
}

const isValidDate = (dt) => {
    return isNaN(dt) && new Date(dt * 1000).toString() === "Invalid Date"
}

if (api && timeStamp && token 
    && !isValidURL(api)
    && !isValidDate(timeStamp)) {

    service.getTrucks(api, token, timeStamp)
        .then(res => {
            if (!res || !res.data || res.data.length === 0) console.log("N/A");

            // sort alpha
            const trucks = res.data.sort((a, b) => {
                if (a.Applicant > b.Applicant) return 1;
                if (a.Applicant < b.Applicant) return -1;
                else return 0;
            });

            trucks.forEach(t => {
                console.log(`${t.Applicant},${t.locationid}`);
            });
        }).catch(() => console.log("N/A"))
        
} else {
    console.log("N/A");
}

