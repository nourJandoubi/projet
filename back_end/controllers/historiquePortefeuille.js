const HistoriquePortefeuille = require("../models/HistoriquePortefeuille");


 
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
      const actions = await HistoriquePortefeuille.find({ idPortefeuille: idPortefeuille }).populate('idEntreprise');
      let somme = 0;
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
  