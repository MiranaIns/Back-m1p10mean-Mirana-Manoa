const Database = require('../database');
const Constant = require("../utils/constant.util");
const {ObjectId} = require("mongodb");
const {v4} = require("uuid");

const VoitureService = {
    findAllVoiture,
    ajoutVoitureClient,
    findByUuid,
    updateVoitureGarageStatus,
    findById
};

const db = Database.getInstance();

const collectionName = 'voiture';

async function findAllVoiture(user, etat){
    try {
        return db.then((db) => {
            const collection = db.collection(collectionName);
            return collection.find({"fk_utilisateur_id": ObjectId(user._id), "voiture_etat_garage": JSON.parse(etat)}).toArray().then(results => {
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

async function findByUuid(uuid){
    try {
        return db.then((db) => {
            const collection = db.collection(collectionName);
            return new Promise((resolve, reject) => {
                collection.findOne({voiture_uuid: uuid}, (err, voiture) => {
                    if (err) {
                        reject(err);
                    }
                    if (!voiture) {
                        reject(new Error("Error find voiture by uuid"));
                    }
                    resolve(voiture);
                });
            });
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

async function updateVoitureGarageStatus(voiture_uuid, status){
    try {
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const updateResult = await collection.updateOne(
                { "voiture_uuid": voiture_uuid },
                { $set: { "voiture_etat_garage": status } }
            );
            return updateResult;
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

async function findById(id){
    try {
        return db.then((db) => {
            const collection = db.collection(collectionName);
            return new Promise((resolve, reject) => {
                collection.findOne({_id: ObjectId(id)}, (err, voiture) => {
                    if (err) {
                        reject(err);
                    }
                    if (!voiture) {
                        reject(new Error("Error find voiture by id"));
                    }
                    resolve(voiture);
                });
            });
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

module.exports = VoitureService;