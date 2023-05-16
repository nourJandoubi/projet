const Portefeuille = require('../models/Portefeuille');
const Action=require('../models/Action');
// fonction pour ajouter un portefeuille
exports.ajouterPortefeuille = async (req, res) => {
  const { nomPortefeuille, soldeTotal, prixTitres, liquidites, dateCreation, indice ,idUser} = req.body;

  try {
    const portefeuilleExists = await Portefeuille.findOne({ idUser: idUser, nomPortefeuille: nomPortefeuille });

    if(portefeuilleExists)
    {     
        res.send({
            error:'portefeuille already exists',
            success:false
        })
        console.log('eroooor')
        return false;
    }
    // créer une nouvelle instance de Portefeuille
    const nouveauPortefeuille = new Portefeuille({
      nomPortefeuille,
      soldeTotal,
      prixTitres,
      liquidites,
      dateCreation,
      indice,
      idUser
    });

    // enregistrer le nouveau portefeuille dans la base de données
    await nouveauPortefeuille.save();

    // renvoyer la réponse
    res.status(201).json({
         success:true,
          message: 'Portefeuille ajouté avec succès',
          portefeuille: nouveauPortefeuille });
  } catch (error) {
    console.error('errrr',error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout du portefeuille' });
  }
};
// Supprime un portefeuille existant
exports.supprimerPortefeuille = async (req, res) => {
    try {
      const portefeuille = await Portefeuille.findByIdAndDelete(req.params.id);
      if (!portefeuille) {
        return res.status(404).send({ message: "Le portefeuille n'a pas été trouvé" });
      }
      res.send({ message: "Le portefeuille a été supprimé avec succès" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Erreur lors de la suppression du portefeuille" });
    }
  };
  
  // Fonction pour modifier les attributs d'un portefeuille
  exports.modifierPortefeuille = async (req, res) => {

    const id = req.params.id;
    const nouveauNom=req.body.nomPortefeuille;
    const nouveauSolde=req.body.soldeTotal;
    const nouvelIndice=req.body.indice
  
    try {
      const portefeuilleExists=await Portefeuille.findOne({id,nouveauNom})
    
      if(portefeuilleExists)
      {
          res.send({
              error:'portefeuille already exists',
              success:false
          })
          console.log('eroooor')
          return false;
      }

      // Recherche du portefeuille à modifier
      const portefeuille = await Portefeuille.findById(id);  
      // Vérification si le portefeuille existe
      if (!portefeuille) {
        throw new Error('Le portefeuille n\'existe pas.');
      }
  
      // Modification des attributs du portefeuille
        portefeuille.nomPortefeuille = nouveauNom;
        portefeuille.soldeTotal += parseInt(nouveauSolde);
        portefeuille.liquidites+=parseInt(nouveauSolde);
        portefeuille.indice = nouvelIndice;

      // Enregistrement des modifications dans la base de données
      await portefeuille.save();
  
      // Retourne le portefeuille modifié
      //res.send(portefeuille);
          // renvoyer la réponse
    res.status(201).json({
      success:true,
       message: 'Portefeuille modifieé avec succès',
       portefeuille: portefeuille });
  
    /*} catch (error) {
      throw new Error(`Impossible de modifier le portefeuille: ${error.message}`);
    }*/
  } catch (error) {
    //console.error(error);
    //res.status(500).json({ message: 'Une erreur est survenue lors de la du portefeuille' });
    res.send({
      error:'portefeuille already exists',
      success:false
  })
  }
  };
  exports.recupererPortefeuilleParId = async (req, res) => {
    try {
      const portefeuille = await Portefeuille.findById(req.params.id);
      if (!portefeuille) {
        return res.status(404).json({ message: "Le portefeuille n'existe pas" });
      }
      res.json(portefeuille);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur');
    }
  }
  exports.recupererActionParId = async (req, res) => {
    try {
      const action = await Action.findById(req.params.id);
      if (!action) {
        return res.status(404).json({ message: "L'action n'existe pas" });
      }
      res.json(action);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur');
    }
  }
  exports.chercherPortefeuilleParInvestisseur = async (req, res) => {
    const idUser = req.params.id;
  
    try {
      // Chercher le portefeuille correspondant à l'utilisateur
      const portefeuille = await Portefeuille.find({ idUser: idUser });
      console.log('portefeuileee',portefeuille);
  
      if (!portefeuille) {
        throw new Error('Le portefeuille n\'a pas été trouvé.');
      }
  
      // Retourner le portefeuille
      return res.status(200).json(portefeuille);
  
    } catch (error) {
      return res.status(500).send(`Impossible de chercher le portefeuille: ${error.message}`);
    }
  };
  