const Database = require('../database');
const Constant = require("../utils/constant.util");
const {ObjectId} = require("mongodb");
const {v4} = require("uuid");

const VoitureService = {
    findAllVoiture,
    ajoutVoitureClient
};

const db = Database.getInstance();

const collectionName = 'voiture';

async function findAllVoiture(user){
    try {
        return db.then((db) => {
            const collection = db.collection(collectionName);
            return collection.find({"fk_utilisateur_id": ObjectId(user._id)}).toArray().then(results => {
                return results;
            });
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

async function ajoutVoitureClient(user, voiture){
    try {
        let options = {};
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const insertResult = await collection.insertOne(
                {
                    "voiture_uuid": v4(),
                    "voiture_marque": voiture.marque,
                    "voiture_modele": voiture.modele,
                    "voiture_immatriculation": voiture.immatriculation,
                    "voiture_couleur": voiture.couleur,
                    "fk_utilisateur_id": user._id,
                    "voiture_etat_garage": false
                },
                { options });
            return insertResult.insertedId;
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

module.exports = VoitureService;