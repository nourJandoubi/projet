const Devise = require('../models/Devise');
const request = require('request');
const axios = require('axios');
const cheerio = require('cheerio');
const app = require('../app')

const Parser = require('rss-parser');
const { resolveTxt } = require('dns/promises');

const parser = new Parser();


  
exports.createDevise = async () => {
  try {
    const urls = [
      

      'https://www.ecb.europa.eu/rss/fxref-usd.html',
      'https://www.ecb.europa.eu/rss/fxref-jpy.html',
      'https://www.ecb.europa.eu/rss/fxref-cad.html',
      'https://www.ecb.europa.eu/rss/fxref-try.html'
  ]
    

    const allItems = [];

    for (const url of urls) {
      const feed = await parser.parseURL(url);
      
      if (!feed || !feed.items) {
        console.error(`Failed to parse feed from ${url}`);
        continue;
      }
      allItems.push(...feed.items);
      
    }

    console.log(`Fetched ${allItems.length} items from ${urls.length} feeds`);

    await Promise.all(allItems.map(item =>
      Devise.updateOne({ title: item.title }, item, { upsert: true }).exec()
    ));

    console.log(`Successfully saved ${allItems.length} Devises.`);
  } catch (error) {
    console.error(`Error fetching or saving Devises: ${error.message}`);
  }
};





exports.getOneDevise = (req, res) => {
    Devise.findOne({
        _id: req.params.id
    }).then(
        (Devise) => {
            res.status(200).json(Devise);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyDevise = (req, res) => {

    Devise.updateOne({ _id: req.params.id }, {
        ...req.body
    }).then(
        () => {
            res.status(201).json({
                message: 'Actualité est modifié avec succée!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteDevise = (req, res) => {
    Devise.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: ' Devise supprimé!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
// exports.getDevisesParDate = (req, res) => {
//     const currentDate = new Date();
// const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0); // début de la journée
// const yesterday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);

// Devise.find({ isoDate: { $gte: yesterday.toISOString(), $lte: startOfDay.toISOString() } })
//   .then((devises) => {
//     if (devises.length === 0) {
//       res.status(404).json({ message: "Aucune devise trouvée pour la journée en cours ou la journée précédente" });
//     } else {
//       res.status(200).json(devises);
//     }
//   })
//   .catch((error) => {
//     res.status(400).json({ error: error });
//   });

//   };
exports.getDevisesParDate = async (req, res) => {
    try {
      // Récupérer la liste des dates de devises
      const dates = await Devise.distinct("isoDate");
      
      // Trier les dates par ordre décroissant
      dates.sort((a, b) => new Date(b) - new Date(a));
      
      // Parcourir les dates pour trouver la première date avec des devises
      let devises = null;
      for (const date of dates) {
        devises = await Devise.find({ isoDate: date });
        if (devises.length > 0) {
          break;
        }
      }
      
      // Si aucune devise n'a été trouvée, renvoyer une erreur 404
      if (devises === null || devises.length === 0) {
        res.status(404).json({ message: "Aucune devise trouvée" });
      } else {
        res.status(200).json(devises);
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des devises" });
    }
  };
  
  
  exports.getAllDevises = (req, res) => {
    Devise.find().then(
        (devises) => {
            res.status(200).json(devises);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
  