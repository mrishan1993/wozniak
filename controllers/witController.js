'use strict';
let Wit = null;
let interactive = null;
var async = require('async');
const config = require('../config');
const helperFunc = require('../lib/helper');
const axios = require('axios');
// import wit libraries
try {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
} catch (e) {
  console.log('Excpetion while fetching the note wit library', e);
}

const accessToken = config.witAccessToken;
const client = new Wit({
  accessToken: accessToken,
});

var witController = {
  witProcessController: async function(request, h) {
    var totalCount = 0;
    var recipes = [];
    var returnObject = {};
    var result = await client
      .message('What is cooking for dinner')
      .then(data => {
        console.log('data', data);
        // callback(null, data);
        return data;
      })
      .catch(error => {
        console.log('error', error);
        return error;
      });
    // do something with result
    // some function here
    // return async.auto(
    //   {
    //     one: function(callback) {
    //       client
    //         .message('What is cooking for dinner')
    //         .then(data => {
    //           console.log('data', data);
    //           callback(null, data);
    //           // return data;
    //         })
    //         .catch(error => {
    //           console.log('error', error);
    //           callback(error, null);
    //         });
    //     },
    //   },
    //   function(err, results) {
    //     return results;
    //   },
    // );

    // generate random number
    var randomNumber = helperFunc.generateRandom(100 - 3);
    // get 3 random recipes
    await axios
      .get(
        'https://api.edamam.com/search?q=indian&app_id=' +
          config.edamamApiID +
          '&app_key=' +
          config.edamamApiKey +
          '&from=' +
          randomNumber +
          '&to=' +
          (randomNumber + 3),
      )
      .then(function(response) {
        // handle success
        console.log(response);
        if (
          response.data &&
          response.data.hits &&
          response.data.hits.length > 0
        ) {
          recipes = response.data.hits;
          returnObject = {
            success: true,
            data: recipes,
            status: 200,
          };
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
        returnObject = {
          success: false,
          error: error.message,
        };
      })
      .then(function() {
        // always executed
      });
    // const movie = await request.mongo.db
    //   .collection('listingsAndReviews')
    //   .find({})
    //   .limit(20)
    //   .toArray();
    return returnObject;
  },
};

module.exports = witController;
