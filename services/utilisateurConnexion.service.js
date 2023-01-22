const Database = require('../database');
const Constant = require("../utils/constant.util");

const UtilisateurConnexionService = {
    findUtilisateurConnexionByEmail,
    findUtilisateurByUtilisateurConnexionId
};

const db = Database.getInstance();

const collectionName = 'utilisateur_connexion';

async function findUtilisateurConnexionByEmail(mail){
    try {
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
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

async function findUtilisateurByUtilisateurConnexionId(idUtilisateurConnection){
    try {
        return db.then((db) => {
            const collection = db.collection("utilisateur");
            return new Promise((resolve, reject) => {
                collection.findOne({utilisateur_connexion_id: idUtilisateurConnection}, (err, utilisateur) => {
                    if (err) {
                        reject(err);
                    }
                    if (!utilisateur) {
                        reject(new Error("Error find utilisateur by Id"));
                    }
                    resolve(utilisateur);
                });
            });
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

module.exports = UtilisateurConnexionService;