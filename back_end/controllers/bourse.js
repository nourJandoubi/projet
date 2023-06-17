const Entreprise = require('../models/Entreprise');
const Bourse = require('../models/Bourse');
const Action =require('../models/Action')




exports.creerBourse = async () => {
    try {
      // Récupérer tous les noms de bourse distincts de la collection "Entreprise"
      const nomsBourse = await Entreprise.distinct('bourse');
  
      // Pour chaque nom de bourse, créer un nouvel objet de la collection "Bourse"
      for (const bourse of nomsBourse) {
        if (bourse) {
          const nouvelleBourse = new Bourse({
            nom: bourse
          });
  
          await nouvelleBourse.save();
        }
      }
  
    } catch (err) {
      console.log('Erreur lors de la création des bourses', err);
    }
  
    try {
      // Récupérer toutes les entreprises
      const entreprises = await Entreprise.find();
  
      // Récupérer toutes les bourses
      const bourses = await Bourse.find();
  
      // Pour chaque entreprise, ajouter l'ID de l'entreprise à la bourse correspondante
      entreprises.forEach((entreprise) => {
        const bourse = bourses.find((b) => b.nom === entreprise.bourse);
  
        if (bourse) {
          bourse.entreprises.push(entreprise._id);
        }
      });
  
      // Enregistrer les modifications apportées à chaque bourse
      await Promise.all(bourses.map((bourse) => bourse.save()));
  
    } catch (err) {
      console.log('Erreur lors de l\'ajout des entreprises aux bourses correspondantes.', err);
    }
  };
  
  exports.recupererBourses = (req, res) => {
    Bourse.distinct('nom').then(
        (bourses) => {
            res.status(200).json(bourses);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
  
exports.recupererBourseParNom = async (req, res) => {
  const { nomBourse } = req.params;
  try {
    const bourse = await Bourse.findOne({ nom: nomBourse });
    if (!bourse) {
      return res.status(404).json({ message: `La bourse ${nomBourse} n'existe pas.` });
    }

    const entrepriseIds = bourse.entreprises.map(entreprise => entreprise._id);

    const actions = await Action.find({ nomEntreprise: { $in: entrepriseIds } }).populate('nomEntreprise');
    return res.status(200).json(actions);

  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des actions.', error });
  }
};




  