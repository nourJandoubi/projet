const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const router = express.Router();
const generateToken=require('../utils/generateToken')

const app = express();

// Configuration de Nodemailer pour l'envoi d'e-mails
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'dorrabenmimoun@gmail.com',
    pass: 'Dorra2001'
  }
});

// Endpoint pour la demande de réinitialisation de mot de passe
router.post('/forgot-password', async (req, res) => {
  try {
    console.log('body',req.body.email)
    const  {email}  = req.body.email;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email:req.body.email });
    console.log('user forgot ',user)
    if (!user) {
        
      return res.status(404).json({ error: 'User not found' });
    }

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date()+36000; // Expiration après 1 heure
    await user.save();

    // Créer l'URL de réinitialisation
    //const resetUrl = `http://192.168.56.1:4200/reset-password/${resetToken}`;
    const resetUrl = `http://localhost:4200/reset-password/${resetToken}`;

    // Envoyer l'e-mail de réinitialisation
    await transporter.sendMail({
      from: 'dorrabenmimoun@gmail.com',
      to: req.body.email,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) has requested the reset of the password. Please click the following link to reset your password:\n\n${resetUrl}`
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint pour la réinitialisation du mot de passe
router.post('/reset-password/:token', async (req, res) => {
  try {
    //const { token } = req.params;
    //const { password } = req.body.password;
//console.log('password',password);
//console.log('token',token)
    // Rechercher l'utilisateur avec le token de réinitialisation valide
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      //resetPasswordExpires: { $gt: Date.now() }
    });
    console.log('userrr',user)

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }
console.log('user password **',user.password)
    // Réinitialiser le mot de passe
    //const salt = await bcrypt.genSalt(10)
    user.password = req.body.password;
    console.log('user password 2',user.password)

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    console.log('user afterr',user)

    await user.save();
    console.log('user afterr 2',user)

    //res.status(200).json({ message: 'Password reset successful' });
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