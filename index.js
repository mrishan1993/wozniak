'use strict';

const Hapi = require('@hapi/hapi');
var witRoute = require('./routes/witRoute.js');
var errorRoute = require('./routes/errorRoute.js');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });
  await server.register({
    plugin: require('hapi-mongodb'),
    options: {
      url:
        'mongodb+srv://admin:admin@whatscooking.pbvbr.mongodb.net/sample_airbnb?retryWrites=true&w=majority',
      settings: {
        useUnifiedTopology: true,
      },
      decorate: true,
    },
  });

  server.route(witRoute.witProcess);
  server.route(errorRoute.notFoundRoute);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
