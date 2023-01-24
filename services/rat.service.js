const Database = require('../database');
const Constant = require("../utils/constant.util");
const {ObjectId} = require("mongodb");
const {v4} = require("uuid");

const RatService = {
    findById,
    create
};

const db = Database.getInstance();

const collectionName = 'responsable_atelier';

async function findById(id){
    try {
        return db.then((db) => {
            const collection = db.collection(collectionName);
            return new Promise((resolve, reject) => {
                collection.findOne({_id: ObjectId(id)}, (err, utilisateur) => {
                    if (err) {
                        reject(err);
                    }
                    if (!utilisateur) {
                        reject(new Error("Error find utilisateur by id"));
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


function create( nom, prenom, mail, utilisateurConnexionId, session = undefined){
    try {
        let options = {};
        if(session) {
            options["session"] = session;
        }
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const insertResult = await collection.insertOne(
                {
                    "utilisateur_nom": nom,
                    "utilisateur_prenom":prenom,
                    "utilisateur_mail": mail,
                    "utilisateur_uuid": v4(),
                    "utilisateur_connexion_id": utilisateurConnexionId,
                    "utilisateur_status": 'CREATED'
                },
                { options });
            return insertResult.insertedId;
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

module.exports = RatService;