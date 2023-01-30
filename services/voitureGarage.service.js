const Database = require('../database');
const Constant = require("../utils/constant.util");
const {ObjectId} = require("mongodb");
const {v4} = require("uuid");
const VoitureService = require("./voiture.service");

const VoitureGarageService = {
    depotVoitureGarage,
    findAllVoitureGarage,
    findByUuid,
    updateVoitureGarageAvancement,
    findAllVoitureGarageClient
};

const db = Database.getInstance();

const collectionName = 'voiture_garage';

async function depotVoitureGarage(user, voitureUuid){
    try {
        let options = {};
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const voiture = await VoitureService.findByUuid(voitureUuid);
            await VoitureService.updateVoitureGarageStatus(voitureUuid);
            const insertResult = await collection.insertOne(
                {
                    "fk_voiture_id": voiture._id,
                    "fk_utilisateur_id": user._id,
                    "voiture_garage_uuid": v4(),
                    "voiture_garage_avancement": "Dépot",
                    "voiture_garage_date_depot": new Date(),
                    "voiture_garage_date_recuperation": null,
                    "voiture_garage_devis": null,
                    "voiture_garage_date_debut_reparation": null,
                    "voiture_garage_date_fin_reparation": null
                },
                { options });
            return insertResult.insertedId;
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

async function findAllVoitureGarage(avancement){
    try {
        return db.then((db) => {
            const collection = db.collection(collectionName);
            return collection.find({"voiture_garage_date_recuperation": null, "voiture_garage_avancement": avancement}).toArray().then(garageResults => {
                const collection = db.collection("voiture");
                let promises = garageResults.map(async (garage) => {
                    return collection.findOne({"_id": ObjectId(garage.fk_voiture_id)}).then(voiture => {
                        delete garage._id;
                        delete voiture._id;
                        delete voiture.fk_utilisateur_id;
                        delete garage.fk_voiture_id;
                        garage.voiture_details = voiture;
                        return garage;
                    });
                });
                return Promise.all(promises).then(results => {
                    return results;
                });
            });
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
                collection.findOne({voiture_garage_uuid: uuid}, (err, voiture) => {
                    if (err) {
                        reject(err);
                    }
                    if (!voiture) {
                        reject(new Error("Error find voitureGarage by uuid"));
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

async function updateVoitureGarageAvancement(value, voituregarageuuid){
    try {
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const updateResult = await collection.updateOne(
                { "voiture_garage_uuid": voituregarageuuid },
                { $set: { "voiture_garage_avancement": value } }
            );
            return updateResult;
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

async function findAllVoitureGarageClient(user){
    try {
        return db.then((db) => {
            const collection = db.collection(collectionName);
            return collection.find().toArray().then(garageResults => {
                const collection = db.collection("voiture");
                let promises = garageResults.map(async (garage) => {
                    return collection.findOne({"fk_utilisateur_id": ObjectId(user._id), "voiture_etat_garage": true}).then(voiture => {
                        delete garage._id;
                        delete voiture._id;
                        delete voiture.fk_utilisateur_id;
                        delete garage.fk_voiture_id;
                        garage.voiture_details = voiture;
                        return garage;
                    });
                });
                return Promise.all(promises).then(results => {
                    return results;
                });
            });
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

module.exports = VoitureGarageService;