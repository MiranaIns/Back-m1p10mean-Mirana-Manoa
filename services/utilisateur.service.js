const Database = require('../database');
const Constant = require("../utils/constant.util");
const {ObjectId} = require("mongodb");

const UtilisateurService = {
    findById
};

const db = Database.getInstance();

const collectionName = 'utilisateur';

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

module.exports = UtilisateurService;