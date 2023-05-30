const User=require('../models/user')
const generateToken=require('../utils/generateToken')
const email_verifier = require('email-verifier-node');
const Portefeuille = require('../models/Portefeuille');
const HistoriquePortefeuille = require('../models/HistoriquePortefeuille');

//@desc authenticate user and send login mail
// @route POST /api/users/login
// @access public
exports.seConnecter = async (req, res) => {
  const { email } = req.body
  const password= req.body.password

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    let { password, ...newUser } = user.toObject()
    res.json({
      success: true,
      user: newUser,
      status:user.status,
      token: 'Bearer ' + generateToken(user._id),
    })
  } else {
    res.json({
      success: false,
    })
  }
}
exports.verifierEmail=async(req,res)=>{
  const { email } = req.body
  const result = await email_verifier.verify_email(email);
  const emailExists = result.accept_all;
  
  console.log('email', emailExists);
  if (emailExists === false) {
    res.send({
      error: 'invalid',
      success: false
    });
    return false;
  }
  else
  {
    res.send({
      success: true
    });
    return true;
  }
};

exports.inscription = async (req, res) => {
  const { email } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    //res.status(400)
    res.send({
        error:'User already exists',
        success:false
    })
    console.log('eroooor')
    return false;

  }
  const user = await User.create({
    ...req.body,
    registeredAt: Date.now(), // Ajoute la date d'inscription
    status:'investsor'
  })
  if (user) {
    let { password, ...newUser } = user.toObject()
    res.status(201).json({
      success: true,
      user: newUser,
      token: 'Bearer ' + generateToken(user._id),
    })
    return true;
  } else {
    res.json({
      success: false,
    })
    return false;
  }
}
exports.supprimerCompte = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "Le compte n'a pas été trouvé" });
    }
    else
    {
      const portefeuilles=await Portefeuille.find({idUser:req.params.id})
      console.log('tous les portefeuille',portefeuilles)
       if(portefeuilles)
       {
        portefeuilles.forEach(async portefeuille => {
          console.log('id portefeuille',portefeuille._id)
          const historiques=await HistoriquePortefeuille.find({idPortefeuille:portefeuille._id})
          console.log('historique du portefeuille',historiques);
            historiques.forEach(async  historique=> {
              console.log('id historique',historique._id)
                  const deleteHistorique=await HistoriquePortefeuille.findByIdAndDelete(historique._id);
                  if(deleteHistorique)
                  {
                    console.log('historique ',historique._id,' a ete supprimé avec succé')
                  }
                  else
                  {
                    console.log('historique ',historique._id,' n\'a pas ete supprimé ')

                  }
              
            });
            const deletePortefeuille=await Portefeuille.findByIdAndDelete(portefeuille._id);
            if(deletePortefeuille)
            {
              console.log('portefeuille ',portefeuille._id,' a ete supprimé avec succé')
            }
            else
            {
              console.log('portefeuille ',portefeuille._id,' n\'a pas ete supprimé ')

            }

          
        });
       }
    }
    res.send({ message: "Le compte a été supprimé avec succès" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Erreur lors de la suppression du compte" });
  }
};

exports.modifierProfile =async (req, res) => {
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
exports.verifierMotDePasse =async (req, res) => {
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
}




