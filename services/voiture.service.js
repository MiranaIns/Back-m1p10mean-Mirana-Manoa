const Database = require('../database');
const Constant = require("../utils/constant.util");
const {ObjectId} = require("mongodb");

const VoitureService = {
    findAllVoiture
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



module.exports = VoitureService;