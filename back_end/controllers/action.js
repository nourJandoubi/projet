const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();
const Entreprise=require('../models/Entreprise')
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const Action=require('../models/Action');
const https = require('https');
const HistoriquePortefeuille = require("../models/HistoriquePortefeuille");
const Portefeuille = require("../models/Portefeuille");




exports.getActionById = async (req, res) => {
  Action.findOne({
      _id: req.params.id
  }).then(
      (action) => {
          res.status(200).json(action);
      }
  ).catch(
      (error) => {
          res.status(404).json({
              error: error
          });
      }
  );

};
exports.getActionByEntreprise = async (req, res) => {
  Action.findOne({
      nomEntreprise: req.params.idEntreprise
  }).then(
      (action) => {
          res.status(200).json(action);
      }
  ).catch(
      (error) => {
          res.status(404).json({
              error: error
          });
      }
  );

};



// exports.getActionsParBourse = async (req, res) => 
// {
//   const bourse = req.params.bourse;
//   try {
//     const actions = await Action.aggregate([
//       // Filtrer les actions pour la bourse donnée
//       { $match: { nomBourse: bourse } },
//       // Trier les actions par date décroissante
//       { $sort: { date: -1 } },
//       // Grouper les actions par nom d'entreprise
//       { $group: { _id: "$nomEntreprise", actions: { $push: "$$ROOT" } } },
//       // Pour chaque groupe, prendre la première action (la plus proche en date)
//       { $project: { _id: 0, entreprise: "$_id", action: { $arrayElemAt: ["$actions", 0] } } }
//     ]);
//     res.json(actions);
//   } catch (error) {
//     console.log(`Error fetching actions for ${bourse}: ${error.message}`);
//     res.status(500).json({ error: 'Unable to fetch actions' });
//   }
// };


exports.getAllActions = async(req, res) => {
  try {

    const entreprises = await Entreprise.find().exec();
    const entrepriseIds = entreprises.map((entreprise) => entreprise._id);

    const actions = await Action.find({ nomEntreprise: { $in: entrepriseIds } })
    .populate('nomEntreprise')
    .exec();

    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.stockPricesToDatabase = async () => {
  // Drop the collection before inserting new data
     await Action.deleteMany({});
  
  const apiKey1 = 'd5cc5d0c38488e4a1e76a68f4d37c4d2';
  const apiKey2 = '6f4be5649d0bf36fd645d14c8a567024';
  const apiKey3 = 'b771f2db822a9738d46790a44ce03d62';

  const limit = 643;
  const midpoint =Math.floor(limit / 3);

  for (let i = 0; i < limit; i++) {
    let apiKey;
    if (i < midpoint) {
      apiKey = apiKey1;
    } else if (i < midpoint * 2) {
      apiKey = apiKey2;
    } else {
      apiKey = apiKey3;
    }

    const entreprise = await Entreprise.findOne().skip(i).select('symbol _id').maxTimeMS(20000);

    if (!entreprise) {
      break;
    }

    const keyword = entreprise.symbol;
    const id = entreprise._id;
    const url = `/api/v3/quote/${keyword}?apikey=${apiKey}`;

    const options = {
      hostname: 'financialmodelingprep.com',
      port: 443,
      path: url,
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', async () => {
        const response = JSON.parse(data);
        console.log(response);
        if (response.length > 0) {
          const stock = new Action({
            nomEntreprise: id,
            cours: response[0].price,
            variation: response[0].change,
            bas: response[0].dayLow,
            haut: response[0].dayHigh,
            ouverture: response[0].open,
            cloture: response[0].previousClose
          });

          await stock.save();
        } else {
          console.log(`No data found for keyword '${keyword}'`);
        }
      });

    });

    req.on('error', (error) => {
      console.error(error);
    });

    req.end();
  }
};
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



// exports.oldstockPricesToJson = async () => {
//   const apiKey1 = '627642dadddba43643f8227cb301cf8c';
//   const apiKey2 = '34a0a1a18bee75d140c581c960b1f7ec';
//   const apiKey3 = 'b7c0b7ea093de820c1fd81a4773f505e';

//   const limit = 643;
//   const midpoint = Math.floor(limit / 3);

//   const stocks = [];
//   let jsonData = '';

//   for (let i = 0; i < limit; i++) {
//     let apiKey;
//     if (i < midpoint) {
//       apiKey = apiKey1;
//     } else if (i < midpoint * 2) {
//       apiKey = apiKey2;
//     } else {
//       apiKey = apiKey3;
//     }

//     const entreprise = await Entreprise.findOne()
//       .skip(i)
//       .select('symbol _id')
//       .maxTimeMS(20000);

//     if (!entreprise) {
//       break;
//     }

//     const keyword = entreprise.symbol;
//     const id = entreprise._id;
//     const url = `/api/v3/historical-price-full/${keyword}?apikey=${apiKey}`;

//     const options = {
//       hostname: 'financialmodelingprep.com',
//       port: 443,
//       path: url,
//       method: 'GET'
//     };

//     const req = https.request(options, (res) => {
//       let data = '';

//       res.on('data', (chunk) => {
//         data += chunk;
//       });

//       res.on('end', async () => {
//         const response = JSON.parse(data);
//         console.log(response);
//         if (response.length > 0) {
//           jsonData += JSON.stringify(response);
//         } else {
//           console.log(`No data found for keyword '${keyword}'`);
//         }
//       });
//     });

//     req.on('error', (error) => {
//       console.error(error);
//     });

//     req.end();
//   }

//   // Écriture des données dans le fichier JSON
  
//   fs.writeFileSync('stocks.json', jsonData);
// };







