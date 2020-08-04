'use strict';
let Wit = null;
let interactive = null;
var async = require('async');
const config = require('../config');
const helperFunc = require('../lib/helper');
const Mongoose = require('mongoose');
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
    const movie = await request.mongo.db
      .collection('listingsAndReviews')
      .find({})
      .limit(20)
      .toArray();
    return movie;
  },
};

module.exports = witController;
