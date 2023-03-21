const cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');
const Action=require('../models/Action');
const app = require('../app')

// Define the scraping function
exports.scrapeData = async () => {
    try {
      const response = await axios.get('https://www.boursier.com/actions/paris');
      const $ = cheerio.load(response.data);
      const data = [];
  
      // Extract data from table within section element with class attribute of 'grid-12'
      $('section.grid-12 table').each((index, table) => {
        $(table).find('tr').each(async (index, row) => {
          const rowData = [];
          $(row).find('td').each((index, column) => {
            const item = $(column).text().trim();
            rowData.push(item);
            
          });
          // Create a new model instance and save it to the database
          const action = new Action({
            nomBourse:"paris",
            pubDate:new Date().toISOString(),
            nomEntreprise: rowData[0],
            cours: rowData[1],
            variation: rowData[2],
            ouv: rowData[3],
           haut: rowData[4],
           bas: rowData[5],
           volume: rowData[6],
            
          });
          
          await action.save();
         
          data.push(rowData);
        });
      });
  
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
 

// // Schedule the scraping function to run every min
// cron.schedule('* * * * *', () => {
//   scrapeData();
// });
 
exports.getOneAction = (req, res) => {
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
exports.getAllActions = (req, res) => {
    Action.find().then(
        (actions) => {
            res.status(200).json(actions);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
