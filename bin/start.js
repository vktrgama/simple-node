const fetch = require('node-fetch');

/*
    This service will output trucks in the format: 'Applicant, locationId' 
    in alphabetical order.
*/
const getTrucks = (api, token, timeStamp) => {  
    const date = new Date(timeStamp * 1000);
    const headers = { 'Accept': 'application/json', 'Authorization': `Basic ${token}`}
    const query = `hour=${date.getHours()}&minutes=${date.getMinutes()}&dayOrder=${date.getDay()}`;

    try {
        return fetch(`${api}?${query}`, { headers })
        .then(res => res.json())
    } catch (e) {
        console.log("N/A")
    }
}

module.exports = { getTrucks };