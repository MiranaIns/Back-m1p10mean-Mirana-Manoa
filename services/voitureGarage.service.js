const Database = require('../database');
const Constant = require("../utils/constant.util");
const {ObjectId} = require("mongodb");
const {v4} = require("uuid");
const VoitureService = require("./voiture.service");

const VoitureGarageService = {
    depotVoitureGarage
};

const db = Database.getInstance();

const collectionName = 'voiture_garage';

async function depotVoitureGarage(voitureUuid){
    try {
        let options = {};
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const voiture = await VoitureService.findByUuid(voitureUuid);
            await VoitureService.updateVoitureGarageStatus(voitureUuid);
            const insertResult = await collection.insertOne(
                {
                    "fk_voiture_id": voiture._id,
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


module.exports = VoitureGarageService;