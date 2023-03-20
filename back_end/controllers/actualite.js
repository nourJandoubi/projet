const Actualite = require('../models/Actualite');
const app = require('../app')

const Parser = require('rss-parser');

const parser = new Parser();

// exports.createActualite = async () => {

//     const feed = await parser.parseURL('https://services.lesechos.fr/rss/investir-marches-indices.xml');
//     feed.items.forEach(element => {
//         const actualite = new Actualite({

//             ...element
//         });
//         actualite.save();


//     });


// };
exports.createActualite = async () => {
    try {
        const feed = await parser.parseURL('https://services.lesechos.fr/rss/investir-marches-indices.xml');
        if (!feed) {
            throw new Error('RSS feed is undefined.');
        }
        const items = feed.items.map(item => ({
            ...item
        }));
       
        await Promise.all(items.map(item =>
            Actualite.updateOne({ link: item.link }, item, { upsert: true }).exec()
        ));
        console.log('Successfully fetched and saved actualites.');
    } catch (error) {
        console.error(`Error fetching or saving actualites: ${error.message}`);
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

exports.modifyActualite = (req, res) => {

    Actualite.updateOne({ _id: req.params.id }, {
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

exports.deleteActualite = (req, res) => {
    Actualite.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: ' actualite supprimé!'
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
