const cron = require('node-cron');
const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');
const Action=require('../models/Action');
const app = require('../app')

exports.scrapeData = async () => {
    const baseUrls = [
      'https://www.boursier.com/actions/paris',
      'https://www.boursier.com/actions/new-york',
      'https://www.boursier.com/actions/amsterdam',
      'https://www.boursier.com/actions/bruxelles',
      // Add more URLs here if needed
    ];
  
    const promises = [];
  
    // Loop through the pages and scrape data for each URL
    for (let i = 0; i < baseUrls.length; i++) {
      const baseUrl = baseUrls[i];
  
      for (let pageNum = 1; pageNum <= 2; pageNum++) {
        const url = `${baseUrl}?page=${pageNum}`;
  
        try {
          const response = await axios.get(url);
          const $ = cheerio.load(response.data);
  
          $('section.grid-12 table').each((index, table) => {
            const rows = $(table).find('tr');
  
            rows.each(async (index, row) => {
              const columns = $(row).find('td');
              const rowData = [];
  
              columns.each((index, column) => {
                const item = $(column).text().trim();
                rowData.push(item);
              });
  
              const nomBourse =
                i === 0 ? 'paris' :
                i === 1 ? 'new-york' :
                i === 2 ? 'amsterdam' :
               'bruxelles' ;
           
  
              const action = new Action({
                nomBourse,
                pubDate: new Date().toISOString(),
                nomEntreprise: rowData[0],
                cours: rowData[1],
                variation: rowData[2],
                ouv: rowData[3],
                haut: rowData[4],
                bas: rowData[5],
                volume: rowData[6]
              });
  
              promises.push(action.save());
            });
          });
  
        } catch (error) {
          console.log(`Error scraping page ${pageNum} for ${baseUrl}: ${error.message}`);
        }
      }
    }
  
    await Promise.all(promises);
  };

  // Archive data at midnight
  const archiveData = async () => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    
    if (now.getTime() === midnight.getTime()) {
      const critereArchivage = { pubDate: { $lt: new Date() } };
            
      try {
        const result = await Action.find(critereArchivage);
        const fichierArchivage = 'archive.json';
        fs.writeFile(fichierArchivage, JSON.stringify(result), err => {
          if (err) throw err;
          console.log('Données archivées avec succès.');
        });
                
        await Action.deleteMany(critereArchivage);
        console.log('Données supprimées avec succès.');
      } catch (err) {
        console.log(err);
      }
    }
  };

  setInterval(archiveData, 3600000); // Check every hour if it's midnight and archive data if it is

  cron.schedule('0 * * * *', () => {
    actionController.scrapeData();
  
    console.log("saved action");
  }).start();
  

  
  
  
 
exports.getActionsParBourse = async (req, res) => {
    const bourse = req.params.bourse;
    try {
      const actions = await Action.find({ nomBourse: bourse }).hint({ nomBourse: 1 });
      res.json(actions);
    } catch (error) {
      console.log(`Error fetching actions for ${bourse}: ${error.message}`);
      res.status(500).json({ error: 'Unable to fetch actions' });
    }
  };
  


exports.modifyAction = (req, res) => {

    Action.updateOne({ _id: req.params.id }, {
        ...req.body
    }).then(
        () => {
            res.status(201).json({
                message: 'Action est modifié avec succée!'
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

exports.deleteAction = (req, res) => {
    Action.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: ' action supprimé!'
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


exports.getAllActions = async (req, res) => {
    const pageSize = 10
    const page = Number(req.params.pageNumber) || 1
  
    const location = req.params.location
      ? {
        nomBourse: {
            $regex: req.params.location,
            $options: 'i',
          },
        }
      : {}
  
    const count = await Action.countDocuments({ ...location })
    const products = await Action.find({ ...location })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
  
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
  }
