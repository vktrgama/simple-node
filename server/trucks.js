const fetch = require('node-fetch');

const getTrucksController = (req, res) => {
    const SODA_TOKEN =  'ZuuJMTjMmRXMkyRzrq6nRQD91';
    const url = 'https://data.sfgov.org/resource/jjew-r69b.json?start24=11:00&end24=12:00&dayorder=4'

    const headers = {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'X-App-Token': SODA_TOKEN,
    };

    let page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    try {
        return fetch(url, { headers })
        .then(response => response.json())
        .then( response => {
            

            let lengths = response.map((v, i) => {
                return {index: i, value: v.length};
            })
            lengths.sort((a, b) => a.value < b.value)
            let temp = lengths.map( l => {
                return response[l.index];
            })

            temp.sort((a, b)=> {
               return a.applicant.toLowerCase() > b.applicant.toLowerCase() 
                    ? 1 : -1;
            })

            if (page < 0) page = 1;
            let start = (page -1) * limit;
            let end = page * limit;
            res.json(temp.slice(start, end));
        });
    } catch (err) {
        console.log(`err=>${err}`);
        return err;
    }
}

module.exports = { getTrucksController };