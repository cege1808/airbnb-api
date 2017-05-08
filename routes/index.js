var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');
var needle = require('needle');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/api', function(req, res, next){
  console.log(req.query.guests)
  var query = req.query;
  var url = "https://www.airbnb.ca/search/search_results";

  var params = {
    canonical_host: 'www.airbnb.ca',
    api_config: {key: 'd306zoyjsyarp7ifhu67rjxn52tv0t20'},
    checkin: query.checkin || '',
    checkout: query.checkout || '',
    guests: query.guests || 1,
    page: query.page || 1,
    location: query.location || '',
    price_min: query.price_min || 0,
    price_max: query.price_max || 10000,
    min_bedrooms: query.min_bedrooms || 1,
    min_bathrooms: query.min_bathrooms || 1,
    min_beds: query.min_beds || 1,
    superhost: query.superhost || false,
    hosting_amenities: query.hosting_amenities || [],
    property_type_id: query.property_type_id || [],
    languages: query.languages || [],
    keywords: query.keywords || '',
    room_types: query.room_types || [],
    ib: query.ib || false,
    neighborhoods: query.neighborhoods || []
  }

  needle.request('get', url, params, function(err, response, body){
    if(err){ throw err }
    results = JSON.stringify(body)
    console.log(body)
    res.send(results)
  })

})

module.exports = router;

/**
* Available search options
* options = {
*   checkin: {String},
*   checkout: {String},
*   guests: {Number},
*   page: {Number},
*   location: {String}, e.g: 'New York, NY' or 'Seattle, WA'
*   price_min: {Number},
*   price_max: {Number},
*   min_bedrooms: {Number},
*   min_bathrooms: {Number},
*   min_beds: {Number},
*   superhost: {Boolean},
*   hosting_amenities: {Array of id}, e.g: [1,4]
*   property_type_id: {Array of id}, e.g: [1]
*   languages: {Array of id}, e.g: [1,64]
*   keywords: {String}, e.g: 'ocean,view,balcony'
*   room_types: {Array}, e.g: ['Entire home/apt', 'Private room', 'Shared room']
*   ib: {Boolean}, instant-book,
*   neighborhoods: {Array}, e.g: ['Belltown', 'Queen Anne']
* }
*/
