const Database = require('../database');
const Constant = require("../utils/constant.util");
const {ObjectId} = require("mongodb");
const {v4} = require("uuid");
const VoitureGarageService = require("./voitureGarage.service");

const VoitureDevisService = {
    ajoutVoitureDevis
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
                    "fk_responsable_atelier_id": user._id,
                    "voiture_devis_description": devis.voiture_devis_description,
                    "voiture_devis_date": new Date(),
                    "voiture_devis_etat": "en attente",
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

module.exports = VoitureDevisService;