const User=require('../models/user')
//--------Admin----------------
exports.usersToday =async (req, res, next) => {
    const {day}=req.params;
    const now = new Date(day);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    User.find({ registeredAt:  { $gte: today, $lte: tomorrow }}).exec()
    .then((users) => {
      const total = users.reduce((acc, user) => acc +1, 0);
      res.send({total});
    })
    .catch((err) => {
      return next(err);
    });
  };
  // Route pour afficher le nombre de visiteurs de la semaine dernière
  exports.usersLastWeek = async (req, res, next) => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7); 
      try {
        const users = await User.find({ registeredAt: { $gte: lastWeek, $lte: today } }).then((userss) => {
          const total = userss.reduce((acc, user) => acc + 1, 0);
          res.send({total,userss});
        })
      } catch (err) {
        return next(err);
      }
    };
  exports.usersByMonth = (req, res, next) => {
    const { year, month } = req.params;
    // Convertir les paramètres de chaîne en entiers
    const yearInt = parseInt(year);
    const monthInt = parseInt(month) - 1; // les mois commencent à zéro dans Date()
    // Créer les dates pour le mois donné
    const startDate = new Date(yearInt, monthInt, 1);
    const endDate = new Date(yearInt, monthInt + 1, 0);
    User.find({ registeredAt: { $gte: startDate, $lte: endDate } })
      .then((users) => {
        const investisseurs = users.map((user) => ({
          id: user.id,
          registeredAt:user.registeredAt
        }));   
        const total = users.reduce((acc, user) => acc + 1, 0);
        res.send({total,investisseurs});
      })
      .catch((err) => next(err));
  };
  exports.usersByYear = (req, res, next) => {
    const { year } = req.params;
    // Convertir le paramètre de chaîne en entier
    const yearInt = parseInt(year);
    // Créer les dates pour l'année donnée
    const startDate = new Date(yearInt, 0, 1);
    const endDate = new Date(yearInt, 11, 31);
    User.find({ registeredAt: { $gte: startDate, $lte: endDate } })
      .then((users) => {
        const investisseurs = users.map((user) => ({
          id: user.id,
          registeredAt:user.registeredAt
        }));
        const total = users.reduce((acc, user) => acc + 1, 0);
        res.send({total,investisseurs});
      })
      .catch((err) => next(err));
  };
  exports.totalUsers = (req, res, next) => {
    User.countDocuments({})
      .then((count) => {
        res.send({count});
      })
      .catch((err) => next(err));
  };
  exports.usersByCountry = (req, res, next) => {
    User.aggregate([
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).then((result) => {
      const usersByCountry = result.map((item) => {
        return { country: item._id, count: item.count };
      });
      res.send({ usersByCountry });
    }).catch((err) => next(err));
  };
  exports.totalCountries = (req, res, next) => {
    User.distinct('country')
      .then((countries) => {
        res.send(`${countries.length}`);
      })
      .catch((err) => next(err));
  };
  