witController = require('../controllers/witController');

const witRoute = {
  helloWorld: {
    method: 'GET',
    path: '/hello',
    handler: witController.helloController,
  },
};

module.exports = witRoute;
