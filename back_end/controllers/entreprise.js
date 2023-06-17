const Entreprise = require('../models/Entreprise');
const request = require('request');
const https = require('https');
const fs = require('fs');
const Action = require('../models/Action');

// exports.createEntreprise = async () => {
//     const options = {
//       hostname: 'financialmodelingprep.com',
//       path: '/api/v3/financial-statement-symbol-lists?apikey=978c245137a277074ab5efb5b0bd2e3c',
//       method: 'GET'
//     };
  
//     https.get(options, async (res) => {
//       let data = '';
//       res.on('data', (d) => {
//         data += d;
//       });
  
//       res.on('end', async () => {
//         try {
//           const entreprises = JSON.parse(data);
//           console.log(entreprises)
//           const existingEntreprises = await fs.promises.readFile('./entreprises.json', 'utf-8').then(JSON.parse).catch(() => []);
  
//           const entrepriseDocs = Array.isArray(entreprises) ? entreprises.reduce((docs, company) => {
//             const existingCompany = existingEntreprises.find(e => e.symbole === company);
  
//             if (!existingCompany) {
//               docs.push({
//                 symbole: company,
//               });
//             }
//             return docs;
//           }, []) : [];
  
//           if (entrepriseDocs.length === 0) {
//             console.log('All entreprises already exist in the JSON file.');
//             return;
//           }
  
//           await fs.promises.writeFile('./entreprises.json', JSON.stringify(existingEntreprises.concat(entrepriseDocs)));
  
//           console.log(`Added ${entrepriseDocs.length} entreprises to the JSON file.`);
//         } catch (error) {
//           console.error('Error adding entreprises to the JSON file:', error);
//         }
//       });
//     }).on('error', (error) => {
//       console.error('Error fetching data:', error);
//     });
//   };
  
// exports.updateEntreprisesSansNom = async () => {
//     try {
//       const entreprises = await Entreprise.find({ nom: { $exists: false } }).select('symbol');
//      console.log(entreprises.length)
//       for (const entreprise of entreprises) {
//         const apiKey = 'cheejchr01qoev2rqq80cheejchr01qoev2rqq8g';
//         const symbol = entreprise.symbol;
//         const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`;
//         console.log("url", url);
//         request.get({
//           url: url,
//           json: true,
//           headers: {'User-Agent': 'request'}
//         }, async (error, response, data) => {
//           if (error) {
//             console.log(`Error getting details for ${entreprise.symbol} from API: ${error}`);
//           } else if (response.statusCode !== 200) {
//             console.log(`Status code ${response.statusCode} received for ${entreprise.symbol}`);
//           } else {
//             console.log(data);
//             const company = data;
//             const updateObj = {
//               symbol: company['ticker'],
//               nom: company['name'],
//               description: company['finnhubIndustry'],
//               secteurActivite: company['industry'],
//               employes: company['employeeTotal'],
//               prixActuel: company['ipo']
//             };
//             try {
//               const updatedEntreprise = await Entreprise.findOneAndUpdate(
//                 { symbol: entreprise.symbol },
//                 { $set: updateObj },
//                 { new: true }
//               );
//               console.log(`Successfully updated ${updatedEntreprise.nom} in the database`);
//             } catch (error) {
//               console.log(`Error updating ${entreprise.nom} in the database: ${error}`);
//             }
//           }
//         });
//       }
//     } catch (error) {
//       console.log(`Error fetching entreprises from the database: ${error}`);
//     }
//   };
  

// exports.createEntreprisesFromJSON = async () => {
//     try {
//       const entreprisesJSON = await fs.promises.readFile('./entreprises.json', 'utf-8');
//       const entreprises = JSON.parse(entreprisesJSON);
  
//       // Drop the collection before inserting new data
//       await Entreprise.deleteMany({});
  
//       for (const entreprise of entreprises) {
//         const newEntreprise = new Entreprise({
//           symbol: entreprise.symbole
//         });
//    console.log(newEntreprise)
//         await newEntreprise.save();
       
//       }
  
//       console.log('Done creting all companies!');
     
//     } catch (error) {
//       console.error('Error creating entreprises:', error);
//     }
//   };
  
// exports.deleteEntreprises = () => {
//     Entreprise.deleteMany({ nom: { $exists: false } })
//       .then(() => {
//         console.log('Entreprises supprimées avec succès' );
//       })
//       .catch((error) => {
//         console.error(error);
      
//       });
//   };
  
  
  





  



// exports.updateEntreprisesFromAPI = async () => {
//     try {
//       // Find the first 10 entreprises in the database
//       const entreprises = await Entreprise.find({}).skip(1460).limit(40);
//         //const entreprise = await Entreprise.findOne({symbol:'AUSOMENT.NS'});
//       // Loop over the entreprises and update their data from the API
//      for (const entreprise of entreprises) {
//         const keyword = entreprise.symbol;
//         const https = require('https');
  
//         const options = {
//           hostname: 'financialmodelingprep.com',
//           port: 443,
//           path: `/api/v3/profile/${keyword}?apikey=fc756b86e312785dab5c983380d86e3b&locale=fr`,
//           method: 'GET'
//         }
  
//         // Send the HTTPS request to the API using the options object
//         const req = https.request(options, (res) => {
//           let data = '';
  
//           res.on('data', (chunk) => {
//             data += chunk;
//           });
          
  
//           res.on('end', async () => {
//             // Parse the JSON response from the API
//             const companies = JSON.parse(data);
  
//             // Check if there is a company in the response data
//             if (companies && companies.length > 0) {
//               const company = companies[0];
              
  
//               // Update the entreprise in the database
//               entreprise.symbol = company['symbol'];
//               entreprise.nom = company['companyName'];
//               entreprise.secteur = company['sector'];
//               entreprise.description = company['description'];
//               entreprise.ville=company['city'];
//               entreprise.pays=company['country'];
//               entreprise.bourse=company['exchangeShortName'];
//               entreprise.industrie=company['industry'];
//               entreprise.siteWeb=company['website'];
//               entreprise.devise=company['currency'];
//               entreprise.prix=company['price'];
//               entreprise.beta=company['beta'];
//               entreprise.volumeMoyen=company['volAvg'];
//               entreprise.capitalisation=company['mktCap'];
//               entreprise.plage=company['range'];
//               entreprise.variation=company['changes'];
//               entreprise.cik=company['cik'];
//               entreprise.isin=company['isin'];
//               entreprise.cusip=company['cusip'];
//               entreprise.pdg=company['ceo'];
//               entreprise.nbEmployes=company['fullTimeEmployees'];
//               entreprise.telephone=company['phone'];
//               entreprise.adresse=company['adress'];
//               entreprise.image=company['image'];
//               entreprise.dateIntroductionBourse=company['ipoDate'];


  
//               await entreprise.save();
//               console.log(`Successfully updated ${entreprise.symbol} in the database`);
//             } else {
//               console.log(`No data found for ${keyword}`);
//             }
//           });
//         });
  
//         req.on('error', (error) => {
//           console.error(error);
//         });
  
//         req.end();
//       }
//      } 
//     catch (error) {
//       console.log(`Error updating entreprises from API: ${error}`);
//     }
//   };
exports.recupererEntrepriseParNom = (req, res) => {
    //console.log('nom',encodeURI(req.params.nom).replace(/%/g, '%25'))
    const searchQuery = decodeURIComponent(req.params.nom);

    Entreprise.findOne({
        nom: searchQuery
    }).then(
        (entreprise) => {
            res.status(200).json(entreprise);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.recupererEntrepriseParId = async (req, res) => {
    Entreprise.findOne({
        _id: req.params.id
    }).then(
        (entreprise) => {
            res.status(200).json(entreprise);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );

};

exports.recupererEntreprises = (req, res) => {
    Entreprise.find({ nom: { $exists: true } }).select('symbol').then(
        (entreprises) => {
            res.status(200).json(entreprises);
            
            
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
exports.recupererSecteurs = async (req, res) => {
    Entreprise.distinct('secteur').then((secteurs) => {
      // Filtrer les chaînes vides et les valeurs nulles du tableau secteurs
      const filteredSecteurs = secteurs.filter((secteur) => secteur && secteur.trim() !== '');
  
      res.status(200).json(filteredSecteurs);
    });
  };
exports.recupererEntrepriseParBourseEtSecteur = async (req, res) => {
    try {
      const { bourse, secteur } = req.body;
      console.log('bourse et secteur',req.body)
      let entreprises
    if(bourse =='')
    {
        entreprises = await Entreprise.find({ secteur }).exec();
    }
    if (secteur =='')
    {
         entreprises = await Entreprise.find({ bourse}).exec();

    }
    if(bourse !=''&& secteur !='')
    {
        entreprises = await Entreprise.find({ bourse, secteur }).exec();


    }

      const entrepriseIds = entreprises.map((entreprise) => entreprise._id);
  
      const actions = await Action.find({ nomEntreprise: { $in: entrepriseIds } })
      .populate('nomEntreprise')
      .exec();
  
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  