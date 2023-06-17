const adminController = require('../controllers/admin');

const visitorsMiddleware = (req, res, next) => {
  adminController.visitors(req, res, next);
}

module.exports = visitorsMiddleware;