const fetch = require('node-fetch');
const cTable = require('console.table');

const SODA_TOKEN =  'ZuuJMTjMmRXMkyRzrq6nRQD91';
const SFGOV_API = 'https://data.sfgov.org/resource/jjew-r69b.json'


const getTrucks = (dayOrder, startTime, offset) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'X-App-Token': SODA_TOKEN,
    };

    const queryString = 
        `$select=applicant, location` +
        `&$where=dayorder=${dayOrder} AND start24>='${startTime}'` +
        `&$order=applicant ASC` +
        `&$limit=10` +
        `&$offset=${offset}`;

    try {
        return fetch(`${SFGOV_API}?${queryString}`, { headers })
        .then(response => {
            return response.json()
        })
    } catch (err) {
        console.log({err});
        return err;
    }
}

module.exports = {
    getTrucks
}