const Visite = require('../models/visite');

// Middleware pour enregistrer le nombre de visiteurs
exports.visitors = async (req, res, next) => {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    today.setDate(today.getDate() + 1);
    today.setHours(0, 0, 0, 0);
    try {
      const visite = await Visite.findOne({ date: today });
      if (!visite)
       {
        const newVisite = new Visite({ date: today, count: 1 });
        await newVisite.save();
      } else {
        visite.count++;
        await visite.save();
      }
      next();
    } catch (err) {
      next(err);
    }
  };
exports.visitorsToday = (req, res, next) => {
  const {day}=req.params;
  const now = new Date(day);
  const today = new Date(now.getFullYear(),now.getMonth(), now.getDate());
    today.setDate(today.getDate() + 1);
    Visite.findOne({ date: today })
    .then(visite => {
      if (!visite) {  
        res.send('0');
      } else {
        let total=visite.count;
        res.send({total});
      }
    })
    .catch(err => {
      return next(err);
    });
};
exports.visitorsLastWeek = async (req, res, next) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    today.setDate(today.getDate() + 1);
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    try {
      const visites = await Visite.find({ date: { $gte: lastWeek, $lte: today } }).exec();
      const total = visites.reduce((acc, visite) => acc + visite.count, 0);
      console.log('visites',visites)
      console.log('total',total)
      res.send({total,visites});
    } catch (err) {
      return next(err);
    }
  };
exports.visitorsByMonth = (req, res, next) => {
    const { year, month } = req.params;
  
    // Convertir les paramètres de chaîne en entiers
    const yearInt = parseInt(year);
    const monthInt = parseInt(month) - 1; // les mois commencent à zéro dans Date()
  
    // Créer les dates pour le mois donné
    const startDate = new Date(yearInt, monthInt, 1);
    const endDate = new Date(yearInt, monthInt + 1, 0);
  
    Visite.find({ date: { $gte: startDate, $lte: endDate } })
      .then((visites) => {
        const visiteurs = visites.map((visite) => ({
            id: visite.id,
            count: visite.count,
            date: visite.date,
          }));
        const total = visites.reduce((acc, visite) => acc + visite.count, 0);
        res.send({
          total,
          visiteurs
        });
      })
      .catch((err) => next(err));
  };
exports.visitorsByYear = (req, res, next) => {
    const { year } = req.params;
  
    // Convertir le paramètre de chaîne en entier
    const yearInt = parseInt(year);
  
    // Créer les dates pour l'année donnée
    const startDate = new Date(yearInt, 0, 1);
    const endDate = new Date(yearInt, 11, 31);
  
    Visite.find({ date: { $gte: startDate, $lte: endDate } })
      .then((visites) => {
        const visiteurs = visites.map((visite) => ({
            id: visite.id,
            count: visite.count,
            date: visite.date,
          }));
        const total = visites.reduce((acc, visite) => acc + visite.count, 0);
        res.send({
          total,
          visiteurs
        });
        
      })
      .catch((err) => next(err));
  };
exports.totalVisitors = (req, res, next) => {
    Visite.aggregate([{ $group: { _id: null, total: { $sum: "$count" } } }])
      .then((result) => {
        const total = result.length > 0 ? result[0].total : 0;
        res.send(`${total}`);
      })
      .catch((err) => next(err));
  };