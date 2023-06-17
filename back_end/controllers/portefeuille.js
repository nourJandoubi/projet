const Portefeuille = require('../models/Portefeuille');
exports.ajouterPortefeuille = async (req, res) => {
  const { nomPortefeuille, soldeTotal, prixTitres, liquidites, dateCreation, indices, idUser } = req.body;

  try {
    const portefeuilleExists = await Portefeuille.findOne({ idUser: idUser, nomPortefeuille: nomPortefeuille });

    if (portefeuilleExists) {
      res.send({
        error: 'Le portefeuille existe déjà',
        success: false
      });
      return;
    }

    // Créer une nouvelle instance de Portefeuille avec le tableau d'indices
    const nouveauPortefeuille = new Portefeuille({
      nomPortefeuille,
      soldeTotal,
      prixTitres,
      liquidites,
      dateCreation,
      indices,
      idUser
    });

    // Enregistrer le nouveau portefeuille dans la base de données
    await nouveauPortefeuille.save();

    // Renvoyer la réponse
    res.status(201).json({
      success: true,
      message: 'Portefeuille ajouté avec succès',
      portefeuille: nouveauPortefeuille
    });
  } catch (error) {
    console.error('Une erreur est survenue lors de l\'ajout du portefeuille', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout du portefeuille' });
  }
};
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
exports.modifierPortefeuille = async (req, res) => {
    
    const id = req.params.id;
    const nouveauNom = req.body.nomPortefeuille;
    const nouveauSolde = req.body.soldeTotal;
    const nouvelIndice = req.body.indice;
  
    try {
      const portefeuilleExists = await Portefeuille.findOne({ _id: { $ne: id }, nomPortefeuille: nouveauNom });
  
      if (portefeuilleExists) {
        res.send({
          error: 'Un portefeuille avec ce nom existe déjà',
          success: false
        });
        return;
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
      portefeuille.liquidites += parseInt(nouveauSolde);
      
      // Vérification si l'indice n'est pas déjà présent dans le tableau
      const indiceExiste = portefeuille.indices.find(indice => indice === nouvelIndice);
      if (!indiceExiste) {
        portefeuille.indices.push(nouvelIndice);
      }
  
      // Enregistrement des modifications dans la base de données
      await portefeuille.save();
  
      // Renvoyer la réponse
      res.status(201).json({
        success: true,
        message: 'Portefeuille modifié avec succès',
        portefeuille: portefeuille
      });
  
    } catch (error) {
      console.error('Une erreur est survenue lors de la modification du portefeuille', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la modification du portefeuille' });
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
exports.chercherPortefeuilleParInvestisseur = async (req, res) => {
    const idUser = req.params.id;
  
    try {
      const portefeuille = await Portefeuille.find({ idUser: idUser });
      if (!portefeuille) {
        throw new Error('Le portefeuille n\'a pas été trouvé.');
      }
        return res.status(200).json(portefeuille);
  
    } catch (error) {
      return res.status(500).send(`Impossible de chercher le portefeuille: ${error.message}`);
    }
  };
exports.supprimerIndice = async (req, res) => {
    const portefeuilleId = req.params.id;
    const nomIndice = req.params.indice;
  
    try {
      const portefeuille = await Portefeuille.findById(portefeuilleId);
        if (!portefeuille) {
        throw new Error('Le portefeuille n\'existe pas.');
      }
      const indiceIndex = portefeuille.indices.findIndex(indice => indice === nomIndice);
        if (indiceIndex === -1) {
        throw new Error('L\'indice spécifié n\'existe pas dans le portefeuille.');
      }
  
      portefeuille.indices.splice(indiceIndex, 1);  
      await portefeuille.save();
  
      res.status(200).json({
        success: true,
        message: 'L\'indice a été supprimé avec succès du portefeuille.',
        portefeuille: portefeuille
      });
  
    } catch (error) {
      console.error('Une erreur est survenue lors de la suppression de l\'indice du portefeuille', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'indice du portefeuille' });
    }
  };
exports.ajouterIndice= async(req,res)=>{
    const portefeuilleId = req.params.id;
    const nouvelIndice = req.body.indice;

   try{ 
    const portefeuille = await Portefeuille.findById(portefeuilleId);
      if (!portefeuille) {
      throw new Error('Le portefeuille n\'existe pas.');
    }
      const indiceExiste = portefeuille.indices.find(indice => indice === nouvelIndice);
      if (!indiceExiste) {
        portefeuille.indices.push(nouvelIndice);
      }
     await portefeuille.save();
        res.status(201).json({
        success: true,
        message: 'Indice ajouté avec succès',
        portefeuille: portefeuille
      });
    }catch (error) {
      res.status(500).json({ 
        message: 'Une erreur est survenue lors de l\'ajout d\'indice' 
      });
    }
  }
  