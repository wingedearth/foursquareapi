var express = require('express');
var router = express.Router();
var request = require('request');


// Set secret tokens as parameters for API requests
require('dotenv').load();
var clientIdParam     = "?client_id="     + process.env.CLIENT_ID;
var clientSecretParam = "&client_secret=" + process.env.CLIENT_SECRET;
var clientParams      = clientIdParam + clientSecretParam;

// API requests require a v parameter and an m paramater
  // The vParam is the version of the Foursquare API
    var vParam = "&v=20140806";
  // The mParam specifies Foursquare or Swarm responses
    var mParam = "&m=foursquare";

// start building the URI
var baseUri = "https://api.foursquare.com/v2/venues/search";
var uri = baseUri + clientParams + vParam + mParam;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '▦▨▧▩\'in it!' });
});

/* POST to search */
router.post('/search', function(req, res, next) {
  // Printing out the content of the request!
  console.log(req.body);

  // Add URI-encoded location to uri.
  uri += "&near=" + encodeURIComponent(req.body.place.name);
  uri += "&query=" + encodeURIComponent(req.body.place.query);

  console.log("Attempting to connect to: ", uri);

  // Use request to contact the API…
  request.get(uri, function(err, response, body) {
    var body = JSON.parse(body);

    // Call res.send in the API request's callback*!
    res.send(body.response.venues);
  });
});

module.exports = router;
