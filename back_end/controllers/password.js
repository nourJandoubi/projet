const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const router = express.Router();
const generateToken=require('../utils/generateToken')


const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'dorrabenmimoun@gmail.com',
    pass: 'Dorra2001'
  }
});


router.post('/forgot-password', async (req, res) => {
  try {
    const  {email}  = req.body.email;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email:req.body.email });
    if (!user) {
        
      return res.status(404).json({ error: 'User not found' });
    }

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date()+36000; // Expiration après 1 heure
    await user.save();


    const resetUrl = `http://localhost:4200/reset-password/${resetToken}`;


    await transporter.sendMail({
      from: 'dorrabenmimoun@gmail.com',
      to: req.body.email,
      subject: 'Réinitialisation de votre mot de passe',
      text: `  
      Cher utilisateur,
      \n
      Nous avons bien reçu votre demande de réinitialisation de mot de passe. 
      Pour procéder à cette réinitialisation, veuillez cliquer sur le lien ci-dessous :
      \n${resetUrl}
      \n
      Veuillez noter que le lien de réinitialisation sera valide pour une durée limitée. Si vous ne réinitialisez pas votre mot de passe dans ce délai, vous devrez refaire une demande.`
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/reset-password/:token', async (req, res) => {
  try {
  
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(201).json({
        success: true,
        user: user,
        token: 'Bearer ' + generateToken(user._id),
      })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;