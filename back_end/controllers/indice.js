const axios = require('axios');
const Indice = require('../models/indice');

exports.createIndice = async () => {
  const options = {
    method: 'GET',
    url: 'https://global-stock-market-api-data.p.rapidapi.com/major_global_indices_by_price',
    headers: {
      'X-RapidAPI-Key': '5ae4ca2eb4msh1f4a8b9faa8deaep1c6cd9jsn238556819ba3',
      'X-RapidAPI-Host': 'global-stock-market-api-data.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const indiceData = response.data;

    // Check if the response data matches the existing data
    const existingData = await Indice.find().lean();
    const isDataMatched = JSON.stringify(indiceData) === JSON.stringify(existingData);

    if (!isDataMatched) {
      // Clear the Indice collection
      await Indice.deleteMany();

      // Insert the new data
      await Indice.insertMany(indiceData);

    } else {
      console.log('Indice data is up to date.');
    }
  } catch (error) {
    console.error(error);
  }
};
exports.getAllIndices = (req, res) => {
    Indice.find().then(
        (indices) => {
            res.status(200).json(indices);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
exports.getOneIndice= async (req, res) => {
  const name = req.params.nom;

  try {
    // Chercher le portefeuille correspondant à l'utilisateur
    const indice = await Indice.findOne({ name: name });
  console.log('portefeuille',indice)
    if (!indice) {
      throw new Error('L\'indice n\'a pas été trouvé.');
    }

    // Retourner le portefeuille
    return res.status(200).json(indice);

  } catch (error) {
    return res.status(500).send(`Impossible de chercher l\'indice: ${error.message}`);
  }
};