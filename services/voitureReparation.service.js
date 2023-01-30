const Database = require('../database');
const Constant = require("../utils/constant.util");
const {ObjectId} = require("mongodb");
const {v4} = require("uuid");
const ReparationService = require("./reparation.service")

const VoitureReparationService = {
    insertManyReparations
};

const db = Database.getInstance();

const collectionName = 'voiture_reparation';

async function insertManyReparations(reparationsArray, fk_voiture_devis_id) {
    try {
        return db.then(async (db) => {
            const collection = db.collection(collectionName);

            let bulkOps = [];
            for (const reparation of reparationsArray) {
                const reparationfind = await ReparationService.findByUuid(reparation.reparation_uuid);
                bulkOps.push({
                    insertOne: {
                        document: {
                            voiture_reparation_uuid: v4(),
                            fk_reparation_id: ObjectId(reparationfind._id),
                            voiture_reparation_date_debut: null,
                            voiture_reparation_date_fin: null,
                            fk_responsable_atelier_id: null,
                            fk_voiture_devis_id: fk_voiture_devis_id,
                            voiture_reparartion_prix: reparation.voiture_reparartion_prix,
                            voiture_reparation_prix_piece: reparation.voiture_reparation_prix_piece,
                            voiture_reparation_totale: reparation.voiture_reparation_totale,
                        }
                    }
                });
            }

            return collection.bulkWrite(bulkOps, {ordered: false});
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
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

module.exports = VoitureReparationService;