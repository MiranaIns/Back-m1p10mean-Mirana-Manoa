const bcrypt = require('bcrypt');
const Database = require("../../database");

const TestService = {
    register: register
}

const db = Database.getInstance();
const collectionName = 'utilisateur_connexion';

function register( mail, mdp){
    try {
         db.then((db) => {
            const collection = db.collection(collectionName);
            let email = mail;
            let motDePasse = mdp;
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(motDePasse, salt);
            collection.insertOne(
                {
                    "utilisateur_connexion_mail": email,
                    "utilisateur_connexion_mdp_hash": hash,
                    "utilisateur_connexion_mdp_salt": salt
                }
            );
        });
    }
    catch (e){
        throw { error : 'Hello World Error'};
    }
}

module.exports = TestService;