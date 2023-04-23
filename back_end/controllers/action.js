const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const Action=require('../models/Action');
const app = require('../app')

exports.createAction = async () => {
  const baseUrls = [
    'https://www.boursier.com/actions/paris',
    'https://www.boursier.com/actions/new-york',
    'https://www.boursier.com/actions/amsterdam',
    'https://www.boursier.com/actions/bruxelles',
    
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
  nomEntreprise: rowData[0],
  nomBourse: nomBourse,
  cours: rowData[1],
  variation: rowData[2],
  ouv: rowData[3],
  haut: rowData[4],
  bas: rowData[5],
  volume: rowData[6],
  pubDate: new Date().toISOString()
});

const existingAction = await Action.findOne({
  nomEntreprise: rowData[0],
  nomBourse: nomBourse,
  cours: rowData[1],
  variation: rowData[2],
  ouv: rowData[3],
  haut: rowData[4],
  bas: rowData[5],
  volume: rowData[6]
});

if (existingAction) {
  //If an Action instance with the same information already exists, we do not create a new instance.
 
} else {
  //If an Action instance with the same information does not exist, we create a new instance
  await action.save();
  
}
            promises.push(action);
          });
        });

      } catch (error) {
        console.log(`Error scraping page ${pageNum} for ${baseUrl}: ${error.message}`);
      }
    }
  }

  await Promise.all(promises);
};


exports.archiveData = async () => {
  const companyNames = await Action.distinct("nomEntreprise");

  // Create a buffer array to store the archived actions
  let buffer = [];

  for (const companyName of companyNames) {
    const actions = await Action.find({ nomEntreprise: companyName }).sort({ pubDate: -1 });
    const lastDate = actions[0].pubDate;

    const latestActions = actions.filter((action) => {
      return action.pubDate.getTime() === lastDate.getTime();
    });

    const archivedActions = actions.filter((action) => {
      return action.pubDate.getTime() !== lastDate.getTime();
    });

    // Add the archived actions to the buffer
    buffer.push(...archivedActions);

    // Delete the archived actions from the database
    await Action.deleteMany({ _id: { $in: archivedActions.map((a) => a._id) } });
  }

  // Write the archived actions to the file
  fs.appendFile(process.env.ARCHIVE_FILE_PATH, JSON.stringify(buffer), (err) => {
    if (err) throw err;
    console.log(`Archived ${buffer.length} actions.`);
  });
};

exports.getActionsParBourse = async (req, res) => {
  const bourse = req.params.bourse;
  try {
    const actions = await Action.aggregate([
      // Filtrer les actions pour la bourse donnée
      { $match: { nomBourse: bourse } },
      // Trier les actions par date décroissante
      { $sort: { date: -1 } },
      // Grouper les actions par nom d'entreprise
      { $group: { _id: "$nomEntreprise", actions: { $push: "$$ROOT" } } },
      // Pour chaque groupe, prendre la première action (la plus proche en date)
      { $project: { _id: 0, entreprise: "$_id", action: { $arrayElemAt: ["$actions", 0] } } }
    ]);
    res.json(actions);
  } catch (error) {
    console.log(`Error fetching actions for ${bourse}: ${error.message}`);
    res.status(500).json({ error: 'Unable to fetch actions' });
  }
};


  exports.getAllActions = (req, res) => {
    Action.find().then(
        (actualites) => {
            res.status(200).json(actualites);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};


// exports.getAllActions = async (req, res) => {
//     const pageSize = 10
//     const page = Number(req.params.pageNumber) || 1
  
//     const location = req.params.location
//       ? {
//         nomBourse: {
//             $regex: req.params.location,
//             $options: 'i',
//           },
//         }
//       : {}
  
//     const count = await Action.countDocuments({ ...location })
//     const products = await Action.find({ ...location })
//       .limit(pageSize)
//       .skip(pageSize * (page - 1))
  
//     res.json({ products, page, pages: Math.ceil(count / pageSize) })
//   }
