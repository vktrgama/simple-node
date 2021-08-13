const service = require('./service');
const fetch = require('node-fetch');

// test('match data snapshot', () => {
//     return service.getTrucks(4, '10:00', 10).then(data => {
//         expect(data).toMatchSnapshot();
//     });
// });

// const proxyquire = require('proxyquire');
// const serviceFile = proxyquire.load('./service', {
//     'node-fetch': {
//         fetch: () => {
//             return { json: () => Promise.resolve([
//                 { applicant: 'Brazuca Gama', location: '1090 26TH ST' },
//                 { applicant: 'Brazuca TuMama', location: '2030 03RD ST' },
//                 { applicant: 'Brazuca Third', location: '700 PENNSYLVANIA AVE' }
//               ])};
//         }
//     }
//   });

const mockData = { json: () => Promise.resolve([
                    { applicant: 'Brazuca Gama', location: '1090 26TH ST' },
                    { applicant: 'Brazuca TuMama', location: '2030 03RD ST' },
                    { applicant: 'Brazuca Third', location: '700 PENNSYLVANIA AVE' }
                  ])}

jest.mock('node-fetch');
fetch.mockResolvedValue(mockData);

test('the data has values', () => {
    return service.getTrucks(4, '10:00', 10)
    .then(data => {
        console.log(data);
        expect(data).not.toBeNull();
        expect(data.length).toBeGreaterThan(0);
    });
});
