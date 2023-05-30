const HistoriquePortefeuille = require("../models/HistoriquePortefeuille");
const Portefeuille = require("../models/Portefeuille");


  exports.acheterAction = async (req, res) => {
  const historiquePortefeuille = new HistoriquePortefeuille({
    dateOperation: new Date(),
    typeInvestissement: 'achat',
    nombreAction: req.body.nombreAction,
    prixInvestissement: req.body.prixInvestissement,
    idPortefeuille: req.body.idPortefeuille,
    idEntreprise:req.body.idEntreprise
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
  exports.vendreAction = async (req, res) => {
    const historiquePortefeuille = new HistoriquePortefeuille({
      dateOperation: new Date(),
      typeInvestissement: 'vente',
      nombreAction: req.body.nombreAction,
      prixInvestissement: req.body.prixInvestissement,
      idPortefeuille: req.body.idPortefeuille,
      idEntreprise:req.body.idEntreprise
    });
  
    try {
      // Enregistrement de l'historique du portefeuille
      const newHistoriquePortefeuille = await historiquePortefeuille.save();
      // Mise à jour du portefeuille avec le prix de vente
      const portefeuille = await Portefeuille.findById(req.body.idPortefeuille);
      


      const prixTitre = (portefeuille.prixTitres - (req.body.prixInvestissement*req.body.nombreAction)).toFixed(2);
      const liquidite =( portefeuille.liquidites + (req.body.prixInvestissement*req.body.nombreAction)).toFixed(2);
  
      portefeuille.prixTitres = prixTitre;
      portefeuille.liquidites = liquidite;
  
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
  exports.recupererActionsAchetees = async (req, res) => {
    try {
      const idPortefeuille = req.params.id;
        //la méthode populate() est utilisée pour peupler les détails de l'action achetée en utilisant la référence idEntreprise stockée dans chaque entrée d'historique de portefeuille. 
      const actionsAchetees = await HistoriquePortefeuille.find({idPortefeuille:idPortefeuille, typeInvestissement: 'achat' }).populate('idEntreprise');
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

      const actionsVendues = await HistoriquePortefeuille.find({idPortefeuille:idPortefeuille, typeInvestissement: 'vente' }).populate('idEntreprise');
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
      const actions = await HistoriquePortefeuille.find({ idPortefeuille: idPortefeuille }).populate('idEntreprise');
      actions.sort((a, b) => {
       
        const dateA = new Date(a.dateOperation);
        const dateB = new Date(b.dateOperation);
        return dateB.getTime() - dateA.getTime();
      });
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
      const actions = await HistoriquePortefeuille.find({ idPortefeuille: idPortefeuille }).populate('idEntreprise');
      let somme = 0;
  
      // Parcourir les actions et calculer la somme
      actions.forEach(action => {
        somme += parseFloat((action.nombreAction * action.prixInvestissement).toFixed(2));
      });
      return somme;
    } catch (error) {
      console.log(error);
    }
  }
  exports.calculerPourcentageParAction = async (req, res) => {
    try {
      const { idPortefeuille, liquidites, nombreAction, prixInvestissement } = req.body;
      const valeurPortefeuille = await calculerValeurTotalAction(idPortefeuille)+liquidites;
      const valeurAction = nombreAction * prixInvestissement;
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
exports.calculerGainPerte = async (req, res) => {
    try {
      const { prixAchat, prixActuel, nombreActions } = req.body;
  
      const gainPrix = ((parseFloat(prixActuel) - prixAchat) * nombreActions).toFixed(2);
      const gainPourcentage = ((parseFloat(prixActuel) - prixAchat) / prixAchat * 100).toFixed(2);
     
      res.status(200).json({ gainPrix, gainPourcentage });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors du calcul du gain avant vente.",
        error,
      });
    }
  };
  