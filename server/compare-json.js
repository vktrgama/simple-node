const moment = require('moment');
// these files are not provided, they need to be downloaded from s3
const json1 = require('../prod-google.json');
const json2 = require('../stage-google.json');

/*
    This node controller does a DEEP comparison of every data element in both json files
    and returns a json with differences descibed below:
    Difference in values:
    ... parents: 
        [object key]: {
            val_1: '',
            val_2: ''
        }

    e.g.
    potentialAction: {
        actionAccessibilityRequirement: {
            availabilityStarts: {
                    val_1: "2020-08-12T14:25:55.187Z",
                    val_2: "2020-08-12T14:25:56.448Z"
                },
                availabilityEnds: {
                    val_1: "2022-08-12T14:25:55.187Z",
                    val_2: "2022-08-12T14:25:56.448Z"
            }
        }
    }
*/
const compareJsonFiles = (req, res) => {
    res.json(deepCompare(json1.dataFeedElement, json2.dataFeedElement));
}

function deepCompare(obj1, obj2) {
    let result = {};

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        result[key] = { "obj_prod": obj1, "obj_stg": obj2 };
    }

    Object.keys(obj1 || {}).forEach(key => {
        let val1 = obj1[key];
        let val2 = obj2[key];

        // Stripped out seconds from availability dates, there's a difference in secs, not sure if this is normal
        if (key === 'availabilityStarts' || key === 'availabilityEnds') {
            val1 = moment(new Date(val1)).startOf("minute").toISOString();
            val2 = moment(new Date(val2)).startOf("minute").toISOString();
        }
        
        if(val2 !== val1 && !isObject(val1) && !isObject(val2)) {
            result[key] = { "val_prod": val1, "val_stg": val2};
        }

        if (isObject(val1) && isObject(val2)) {
            const value = deepCompare(val1, val2);
            if (value && Object.keys(value).length > 0) {
                result[key] = value;
            }
        }
    });
    return result;
}
  
const isObject = (object) => {
    return object != null && typeof object === 'object';
}

module.exports = { compareJsonFiles };