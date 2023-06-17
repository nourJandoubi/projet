const visiteController = require('../controllers/visite');

const visitorsMiddleware = (req, res, next) => {
  visiteController.visitors(req, res, next);
}

module.exports = visitorsMiddleware;