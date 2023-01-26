const Database = require('../database');
const Constant = require("../utils/constant.util");

const VoitureService = {
    findAllVoiture
};

const db = Database.getInstance();

const collectionName = 'voiture';

async function findAllVoiture(){
    try {
        return db.then((db) => {
            const collection = db.collection(collectionName);
            return collection.find().toArray().then(results => {
                return results;
            });
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}



module.exports = VoitureService;