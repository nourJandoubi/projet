const Actualite = require('../models/Actualite');

const { Translate } = require('@google-cloud/translate').v2;
const axios = require('axios');

const translateText = async (text, targetLanguage) => {
    // Create a new Translate client
    const translate = new Translate({ key: 'AIzaSyDcdqGiv8Upzx7u2RDfrVTsvgqKCtP2LYo' });

    // Translate the text
    try {
        const [translation] = await translate.translate(text, targetLanguage);
        return translation;
    } catch (error) {
        console.error(error);
        throw new Error('Translation request failed.');
    }
};

exports.createActualite = async () => {
    const options = {
        method: 'GET',
        url: 'https://global-stock-market-api-data.p.rapidapi.com/news/latest_news',
        headers: {
            'X-RapidAPI-Key': 'e4895b27f0msh9a9406d24bb6ab3p1bf81ajsn7d5f32e80d1f',
            'X-RapidAPI-Host': 'global-stock-market-api-data.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        const actualiteData = response.data;

        // Translate the news titles to French
        const translatedData = await Promise.all(
            actualiteData.map(async (newsItem) => {
                const translatedTitle = await translateText(newsItem.newsTitle || 'no des', 'fr');
                const translatedContent = await translateText(newsItem.shotDesc || 'no des', 'fr');
                return {
                    ...newsItem,
                    newsTitle: translatedTitle,
                    shotDesc: translatedContent,
                };
            })
        );

        // Check if the response data matches the existing data
        const existingData = await Actualite.find().lean();
        const isDataMatched = JSON.stringify(translatedData) === JSON.stringify(existingData);

        if (!isDataMatched) {
            // Clear the Actualite collection
            await Actualite.deleteMany();

            // Insert the new translated data
            await Actualite.insertMany(translatedData);

            console.log('Actualite data updated successfully.');
        } else {
            console.log('Actualite data is up to date.');
        }
    } catch (error) {
        console.error(error);
    }
};



exports.getOneActualite = (req, res) => {
    Actualite.findOne({
        _id: req.params.id
    }).then(
        (actualite) => {
            res.status(200).json(actualite);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};


exports.getAllActualites = (req, res) => {
    Actualite.find().then(
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
