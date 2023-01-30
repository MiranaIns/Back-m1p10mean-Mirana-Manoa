const Database = require('../database');
const Constant = require("../utils/constant.util");
const {ObjectId} = require("mongodb");
const {v4} = require("uuid");
const VoitureGarageService = require("./voitureGarage.service");
const ResponsableAtelierService = require("./rat.service")
const ReparationService = require("./reparation.service")

const VoitureDevisService = {
    ajoutVoitureDevis,
    findDetailsVoitureDevis
};

const db = Database.getInstance();

const collectionName = 'voiture_devis';

async function ajoutVoitureDevis(user, devis){
    try {
        let options = {};
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const voitureGarage = await VoitureGarageService.findByUuid(devis.voiture_garage_uuid);
            await VoitureGarageService.updateVoitureGarageAvancement("Devis", devis.voiture_garage_uuid);
            const insertResult = await collection.insertOne(
                {
                    "voiture_devis_uuid": v4(),
                    "fk_voiture_garage_id": voitureGarage._id,
                    "fk_utilisateur_id": voitureGarage.fk_utilisateur_id,
                    "fk_responsable_atelier_id": user._id,
                    "voiture_devis_description": devis.voiture_devis_description,
                    "voiture_devis_date": new Date(),
                    "voiture_devis_etat": "attente",
                    "voiture_devis_reparations": devis.voiture_devis_reparations,
                    "voiture_devis_prix": devis.voiture_devis_prix
                },
                { options });
            return insertResult.insertedId;
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

async function findDetailsVoitureDevis(user, voitureGarageUuid){
    try {
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const voitureGarage = await VoitureGarageService.findByUuid(voitureGarageUuid);
            return collection.find({
                "fk_utilisateur_id": ObjectId(user._id),
                "fk_voiture_garage_id": voitureGarage._id
            }).toArray().then(results => {
                let promises = results.map(async (result) => {
                    delete result.fk_voiture_garage_id;
                    delete result.fk_utilisateur_id;
                    result.responsableAtelier = await ResponsableAtelierService.findById(result.fk_responsable_atelier_id);
                    delete result.fk_responsable_atelier_id;
                    delete result.responsableAtelier._id;
                    delete result._id;
                    let voiture_devis_reparations = result.voiture_devis_reparations;
                    const reparationCollection = db.collection("reparation");
                    let reparationPromises = voiture_devis_reparations.map(async (reparation) => {
                       return reparationCollection.findOne({"reparation_uuid": reparation.reparation_uuid}).then(details => {
                           let reparationData = {};
                           reparationData.voiture_reparartion_prix = reparation.voiture_reparartion_prix;
                           reparationData.voiture_reparation_prix_piece = reparation.voiture_reparation_prix_piece;
                           reparationData.voiture_reparation_totale = reparation.voiture_reparation_totale;
                           reparationData.details = details;
                           delete reparationData.details._id;
                           return reparationData;
                       });
                    });
                    let reparationData = await Promise.all(reparationPromises);
                    result.voiture_devis_reparations = reparationData;
                    result.voiture_garage = voitureGarage;
                    delete result.voiture_garage._id;
                    delete result.voiture_garage.fk_voiture_id;
                    delete result.voiture_garage.fk_utilisateur_id;
                    return result;
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

module.exports = VoitureDevisService;