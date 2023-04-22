const asyncHandler=require('express-async-handler')
const User=require('../models/user')
const generateToken=require('../utils/generateToken')
const emailValidator=require('deep-email-validator')
//@desc authenticate user and send login mail
// @route POST /api/users/login
// @access public
exports.authUser = asyncHandler(async (req, res) => {
  const { email } = req.body
  const password = req.body.password

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    let { password, ...newUser } = user.toObject()
    res.json({
      success: true,
      user: newUser,
      token: 'Bearer ' + generateToken(user._id),
    }),()=>{
      done();
    }
  } else {
    res.json({
      success: false,
    }),()=>{
      done();
    }
  }
})

exports.registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    res.send({
        error:'User already exists',
        success:false
    })
  }
  const user = await User.create({
    ...req.body,
    registeredAt: Date.now(), // Ajoute la date d'inscription

  })
  if (user) {
    let { password, ...newUser } = user.toObject()
    res.status(201).json({
      success: true,
      user: newUser,
      token: 'Bearer ' + generateToken(user._id),
    }),()=>{
      done();
    }
  } else {
    res.json({
      success: false,
    }),()=>{
      done();
    }
  }
})



exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json(
      {
        user,
      }.select('-password')
    )
  } else {
    res.status(404)
    throw new Error('Inalid email or passowrd')
  }
})

exports.updateUser = asyncHandler(async (req, res) => {
  console.log('req body modif',req.body)
    const user = await User.findById(req.user._id)    
    if (user) {
      user.email = req.body.email||user.email,
      user.password= req.body.password || user.password,
      user.name = req.body.name || user.name,
      user.lastName = req.body.lastName||user.lastName,
      user.country = req.body.country||user.country
      console.log('user',user)
    } 
      const updatedUser = await user.save();    
      if (updatedUser) {
        res.status(200).json({
          _id: user._id,
          token: 'Bearer ' + generateToken(user._id),
          success:true,
        })
      }
      else {
        res.status(404)
        throw new Error('Something went wrong')
    } 
  }
)

exports.verifPassword = asyncHandler(async (req, res) => {
  const  email  = req.body.email
  const password = req.body.password
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    let { password, ...newUser } = user.toObject()
    res.json({
      success: true,
    })
  } else {
    res.json({
      success: false,
    })
  }
});


//--------Admin----------------
exports.usersToday =async (req, res, next) => {
  const {day}=req.params;
  const now = new Date(day);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //today.setDate(today.getDate() + 1);

  //const tomorrow = new Date(today);
  //tomorrow.setDate(today.getDate() + 1);
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);




  User.find({ registeredAt:  { $gte: today, $lte: tomorrow }}).exec()
  .then((users) => {
    const total = users.reduce((acc, user) => acc +1, 0);
    res.send(`${total}`);
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
        res.send({total});
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
    res.send({result});
  }).catch((err) => next(err));
};
exports.totalCountries = (req, res, next) => {
  User.distinct('country')
    .then((countries) => {
      res.send(`${countries.length}`);
    })
    .catch((err) => next(err));
};