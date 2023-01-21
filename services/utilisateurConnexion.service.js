const Database = require('../database');

const UtilisateurConnexionService = {
    findUtilisateurConnexionByEmail:findUtilisateurConnexionByEmail
};

const db = Database.getInstance();

const collectionName = 'utilisateur_connexion';

async function findUtilisateurConnexionByEmail(mail){
    return db.then((db) => {
        const collection = db.collection(collectionName);
        return new Promise((resolve, reject) => {
            collection.findOne({utilisateur_connexion_mail: mail}, (err, utilisateurConnexion) => {
                if (err) {
                    reject(err);
                }
                if (!utilisateurConnexion) {
                    reject(new Error("Invalid email or password"));
                }
                resolve(utilisateurConnexion);
            });
        });
    });
}

module.exports = UtilisateurConnexionService;