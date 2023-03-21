const cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');
const Action=require('../models/Action');
const app = require('../app')

// Define the scraping function


exports.scrapeData = async () => {
  const baseUrl = 'https://www.boursier.com/actions/paris';
  const data = [];

  // Loop through the pages and scrape data
  for (let pageNum = 1; pageNum <= 6; pageNum++) {
    const url = `${baseUrl}?page=${pageNum}`;

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      $('section.grid-12 table').each((index, table) => {
        $(table).find('tr').each(async (index, row) => {
          const rowData = [];
          $(row).find('td').each((index, column) => {
            const item = $(column).text().trim();
            rowData.push(item);
          });

          // Create a new model instance and save it to the database
          const action = new Action({
            nomBourse: 'paris',
            pubDate: new Date().toISOString(),
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
    } catch (error) {
      console.log(`Error scraping page ${pageNum}: ${error.message}`);
    }
  }

  console.log(data);
};

  
 
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
