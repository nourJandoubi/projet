const HistoriquePortefeuille = require("../models/HistoriquePortefeuille");
const Portefeuille = require("../models/Portefeuille");


//acheter action (ajouter historique et modifier portefeuille)
exports.acheterAction = async (req, res) => {
  const historiquePortefeuille = new HistoriquePortefeuille({
    dateOperation: new Date(),
    typeInvestissement: 'achat',
    nombreAction: req.body.nombreAction,
    prixInvestissement: req.body.prixInvestissement,
    idPortefeuille: req.body.idPortefeuille,
    idAction:req.body.idAction
  });

  try {
    // Enregistrement de l'historique du portefeuille
    const newHistoriquePortefeuille = await historiquePortefeuille.save();
    // Mise à jour du portefeuille avec le prix d'investissement
    const portefeuille = await Portefeuille.findById(req.body.idPortefeuille);

    const prixTitre = (portefeuille.prixTitres + (req.body.prixInvestissement*req.body.nombreAction)).toFixed(2);
    const liquidite =( portefeuille.liquidites - (req.body.prixInvestissement*req.body.nombreAction)).toFixed(2);

    portefeuille.prixTitres = prixTitre;
    portefeuille.liquidites = liquidite;

    await portefeuille.save();

    res.status(201).json({
      message: "Historique ajouté avec succès et portefeuille mis à jour.",
      historiquePortefeuille: newHistoriquePortefeuille,
      portefeuille,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de l'ajout de l'historique du portefeuille.",
      error,
    });
  }
};
//vendre action(ajouter historique et modifier portefeuille)
exports.vendreAction = async (req, res) => {
    const historiquePortefeuille = new HistoriquePortefeuille({
      dateOperation: new Date(),
      typeInvestissement: 'vente',
      nombreAction: req.body.nombreAction,
      prixInvestissement: req.body.prixInvestissement,
      idPortefeuille: req.body.idPortefeuille,
      idAction:req.body.idAction
    });
  
    try {
      // Enregistrement de l'historique du portefeuille
      const newHistoriquePortefeuille = await historiquePortefeuille.save();
      console.log('historique',newHistoriquePortefeuille)
      // Mise à jour du portefeuille avec le prix de vente
      const portefeuille = await Portefeuille.findById(req.body.idPortefeuille);
      console.log('prix titre',portefeuille.prixTitres)
      console.log('prix vente',req.body.prixInvestissement)
      console.log('n',req.body.nombreAction)


      const prixTitre = (portefeuille.prixTitres - (req.body.prixInvestissement*req.body.nombreAction)).toFixed(2);
      const liquidite =( portefeuille.liquidites + (req.body.prixInvestissement*req.body.nombreAction)).toFixed(2);
  
      portefeuille.prixTitres = prixTitre;
      portefeuille.liquidites = liquidite;
      console.log('portefeuille',portefeuille)
  
      await portefeuille.save();
  
      res.status(201).json({
        message: "Vente de l'action effectuée avec succès.",
        historiquePortefeuille: newHistoriquePortefeuille,
        portefeuille,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de l'ajout de l'historique du portefeuille.",
        error,
      });
    }
  };

  exports.supprimerHistorique = async (req, res) => {
    try {
      const historiquePortefeuille = await HistoriquePortefeuille.findByIdAndDelete(req.params.id);
      if (!historiquePortefeuille) {
        return res.status(404).json({
             message: "L'entrée d'historique de portefeuille n'a pas été trouvée"
             });
      }
      res.status(200).json({
         message: "L'entrée d'historique de portefeuille a été supprimée avec succès"
         });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de la suppression de l'entrée d'historique de portefeuille",
        error,
      });
    }
  };

  exports.recupererActionsAchetees = async (req, res) => {
    try {
      const idPortefeuille = req.params.id;
        //la méthode populate() est utilisée pour peupler les détails de l'action achetée en utilisant la référence idAction stockée dans chaque entrée d'historique de portefeuille. 
      const actionsAchetees = await HistoriquePortefeuille.find({idPortefeuille:idPortefeuille, typeInvestissement: 'achat' }).populate('idAction');
      res.status(200).json(actionsAchetees);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de la récupération des actions achetées.",
        error,
      });
    }
  };
  exports.recupererActionsVendues = async (req, res) => {
    try {
      const idPortefeuille = req.params.id;

      const actionsVendues = await HistoriquePortefeuille.find({idPortefeuille:idPortefeuille, typeInvestissement: 'vente' }).populate('idAction');
      res.status(200).json(actionsVendues);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de la récupération des actions vendues.",
        error,
      });
    }
  };

  exports.recupererActionsParPortefeuille = async (req, res) => {
    try {
      const idPortefeuille = req.params.id;
      const actions = await HistoriquePortefeuille.find({ idPortefeuille: idPortefeuille }).populate('idAction');
      console.log('actionsss',actions)
      res.status(200).json(actions);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de la récupération des actions pour ce portefeuille.",
        error,
      });
    }
  };
async function calculerValeurTotalAction(idPortefeuille) {
    try {
      // Récupérer les actions du portefeuille
      const actions = await HistoriquePortefeuille.find({ idPortefeuille: idPortefeuille }).populate('idAction');
      console.log('action',actions)
      let somme = 0;
  
      // Parcourir les actions et calculer la somme
      actions.forEach(action => {
        somme += action.nombreAction * action.prixInvestissement;
      });
      console.log('somme',somme)
  
      return somme;
    } catch (error) {
      console.log(error);
    }
  }
/** fi souret me st7a9itha
 * async function calculerPourcentageParAction(idPortefeuille, liquidites, nombreAction, prixInvestissement) {
  try {
    const valeurPortefeuille = await CalculerValeurTotalPortefeuille(idPortefeuille, liquidites);
    const valeurAction = nombreAction * prixInvestissement;
    const pourcentage = (valeurAction / valeurPortefeuille) * 100;
    return pourcentage;
  } catch (error) {
    console.log(error);
  }
}
 */

  /*exports.calculerPourcentageParAction = (idPortefeuille, liquidites, nombreAction, prixInvestissement) => {
    // Calculer la valeur totale du portefeuille
    const valeurPortefeuille = calculerValeurTotalAction(idPortefeuille) + liquidites;
  
    // Calculer la valeur de l'action
    const valeurAction = nombreAction * prixInvestissement;
  
    // Calculer le pourcentage de l'action
    const pourcentage = (valeurAction / valeurPortefeuille) * 100;
  
    return pourcentage;
  };*/
  exports.calculerPourcentageParAction = async (req, res) => {
    try {
      const { idPortefeuille, liquidites, nombreAction, prixInvestissement } = req.body;
      const valeurPortefeuille = await calculerValeurTotalAction(idPortefeuille)+liquidites;
      console.log('valeurPortefeuille',valeurPortefeuille);
      const valeurAction = nombreAction * prixInvestissement;
      console.log('valeurAction',valeurAction);
      const pourcentage = ((valeurAction / valeurPortefeuille) * 100).toFixed(2);
      res.status(200).json({ pourcentage });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors du calcul du pourcentage de l'action.",
        error,
      });
    }
  };

  exports.calculerPourcentageLiquidite = async (req, res) => {
    try {
      const { liquidites, soldeTotal } = req.body;
      console.log('liquidites',liquidites)
      console.log('soldeTotal',soldeTotal)
      const pourcentage = ((liquidites / soldeTotal) * 100).toFixed(2);
      console.log('pourcentage liquidite',pourcentage)
      res.status(200).json({ pourcentage });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors du calcul du pourcentage de liquidité.",
        error,
      });
    }
  };
/**async function calculerPerformance(idAction, idPortefeuille, prixVente) {
  // Trouver l'historique des opérations d'achat/vente pour cette action
  const historique = await HistoriquePortefeuille.find({
    idAction: idAction,
    idPortefeuille: idPortefeuille,
    typeInvestissement: { $in: ['A', 'V'] } // A pour achat, V pour vente
  }).sort({ dateOperation: 'asc' });

  // Calculer la performance avant la vente
  const dernierAchat = historique.filter(op => op.typeInvestissement === 'A').pop();
  const performanceAvantVente = dernierAchat ? ((prixActuel - dernierAchat.prixInvestissement) * 10) : 0;

  // Calculer la performance après la vente
  const performanceApresVente = ((prixVente - dernierAchat.prixInvestissement) * 100);

  return { performanceAvantVente, performanceApresVente };
}
 */  
  
/**async function calculerGainPerte(idAction, prixVente, quantiteVendue) {
  // Trouver l'enregistrement d'achat le plus récent pour l'action donnée
  const dernierAchat = await HistoriquePortefeuille.findOne({ 
    idAction: idAction, 
    typeInvestissement: "achat" 
  }).sort({ dateOperation: -1 });

  if (!dernierAchat) {
    throw new Error("Aucun enregistrement d'achat trouvé pour cette action");
  }

  // Calculer le gain ou la perte avant la vente
  const gainPerteAvantVente = (prixVente - dernierAchat.prixInvestissement) * dernierAchat.nombreAction * 10;

  // Calculer le gain ou la perte après la vente
  const gainPerteApresVente = (prixVente - dernierAchat.prixInvestissement) * quantiteVendue * 100;

  // Retourner les résultats
  return {
    gainPerteAvantVente: gainPerteAvantVente,
    gainPerteApresVente: gainPerteApresVente
  };
}
 */
exports.calculerGainPerte = async (req, res) => {
    try {
      const { prixAchat, prixActuel, nombreActions } = req.body;
      const gainPrix = ((prixActuel - prixAchat) * nombreActions).toFixed(2);
      const gainPourcentage = ((prixActuel - prixAchat) / prixAchat * 100).toFixed(2);
      res.status(200).json({ gainPrix, gainPourcentage });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors du calcul du gain avant vente.",
        error,
      });
    }
  };
  