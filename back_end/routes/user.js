
const express= require('express')
const router = express.Router()
const protect=require('../middleware/authMiddleware')
const userController=require('../controllers/user')


function sendEmail(receiver, name, code) {
  var result = '';
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'boursepourtoi@gmail.com',
      pass: 'boursepourtoi123'
    }
  });

  var mailOptions = {
    from: 'boursepourtoi@gmail.com',
    to: receiver,
    subject: ' Notification du bourse pour toi' + name,
    text: 'Bonjour Nous avons reçu une demande de réinitialisation de votre mot de passe.' +
      'Entrez le code de réinitialisation du mot de passe suivant : '
      + code,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return result;
}
function sendNotification(receiver) {
  var result = '';
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'boursepourtoi@gmail.com',
      pass: 'boursepourtoi123'
    }
  });

  var mailOptions = {
    from: 'boursepourtoi@gmail.com',
    to: receiver,
    subject: ' Notification du bourse pour toi',
    text: 'Bonjour Nous avons reçu une demande de réinitialisation de votre mot de passe.' +
      'Entrez le code de réinitialisation du mot de passe suivant : '

  };

  transporter.sendMail(mailOptions, function (error, info) {

    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return result;
}
// creation d'un service pour reception de code

router.get('/getCode', async (req, res) => {
  console.log(res)
});


// password send email 
router.post('/request', async (req, res) => {
  try {
    // update code from the client request
    const code = makecode(6);
    sendEmail(req.body.email, req.body.name, code)
    let admin = await Admin.findOneAndUpdate({ _id: req.body._id }, { code: code }, {
      new: true
    });
  } catch (err) {
    return res.json({ status: "ok", message: err })

  }

});
// send email notification  
router.post('/notification', async (req, res) => {
  try {
    sendNotification(req.body.email)
  } catch (err) {
    return res.json({ status: "ok", message: err })

  }

});

function makecode(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
router.post('/code', async (req, res) => {
  try {
    const user = await Admin.findOne({ login: req.body.email });
    console.log("user", user)
    // comparaison bin les deux codes 
    console.log("code user /code ", user.code);

    console.log("code body ", req.body)
    if (req.body.code === user.code) {

      return res.json({ status: "ok", message: 'you can reset' });
    } else {

      return res.json({ status: "err", message: 'wrong code' });
    }
  } catch (err) {
    return res.json({ message: err })
  }
});








router.route('/register/').post(userController.registerUser)
router.route('/login/').post(userController.authUser)
router.route('/update/').put(protect ,userController.updateUser)
router.route('/verifPassword/').put(userController.verifPassword)

 


module.exports=router;
